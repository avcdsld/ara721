import * as fcl from '@onflow/fcl';
import { SHA3 } from 'sha3';
import { secp256k1 } from '@noble/curves/secp256k1.js';

export const ACCESS_NODE = 'https://rest-mainnet.onflow.org';

// The account that pays for and authorizes the artwork transactions.
export const SIGNER_ADDRESS = '0x8c1f11aac68c6777';
// Key 3 is dedicated to this service. ECDSA_secp256k1 / SHA3-256, which is what
// the signing code below produces.
export const SIGNER_KEY_ID = 3;
const ATELIER_ADDRESS = SIGNER_ADDRESS;

// The only two transactions this service will ever sign. They are fixed here on
// the server: nothing the caller sends can influence the Cadence that runs.
export const TRANSACTIONS = {
  create: `\
import Atelier from ${ATELIER_ADDRESS}

transaction {
    prepare(signer: &Account) {
        Atelier.createArt()
    }
}`,
  destroy: `\
import Atelier from ${ATELIER_ADDRESS}

transaction {
    prepare(signer: &Account) {
        let uuids = Atelier.getUUIDs()
        Atelier.destroyArt(uuid: uuids[0])
    }
}`
};

const hash = (message) => {
  const sha = new SHA3(256);
  sha.update(Buffer.from(message, 'hex'));
  return new Uint8Array(sha.digest());
};

const hexToBytes = (hex) =>
  Uint8Array.from(hex.match(/.{1,2}/g).map((b) => parseInt(b, 16)));

const bytesToHex = (bytes) =>
  Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');

// `prehash: false` because the message is already a SHA3-256 digest, and
// `lowS: false` to match what the Flow account has always accepted.
const SIGN_OPTS = { lowS: false, prehash: false };

function normalizeKey(raw) {
  const key = (raw || '').trim().replace(/^0x/, '');
  if (!/^[0-9a-fA-F]{64}$/.test(key)) {
    throw new Error(
      'FLOW_PRIVATE_KEY must be a 64-character hex string (no 0x prefix)'
    );
  }
  return key;
}

export function configureFcl() {
  fcl.config({
    'accessNode.api': ACCESS_NODE,
    'fcl.network': 'mainnet'
  });
}

/**
 * Submits one of the fixed transactions and returns its id. It does not wait
 * for sealing — the browser watches the result over the public access node.
 */
export async function submitTransaction(action, privateKeyHex) {
  const cadence = TRANSACTIONS[action];
  if (!cadence) throw new Error(`unknown action: ${action}`);

  const key = normalizeKey(privateKeyHex);
  configureFcl();

  const authz = async (account) => ({
    ...account,
    tempId: `${SIGNER_ADDRESS}-${SIGNER_KEY_ID}`,
    addr: fcl.sansPrefix(SIGNER_ADDRESS),
    keyId: SIGNER_KEY_ID,
    signingFunction: async (signable) => ({
      addr: fcl.withPrefix(SIGNER_ADDRESS),
      keyId: SIGNER_KEY_ID,
      signature: bytesToHex(
        secp256k1.sign(hash(signable.message), hexToBytes(key), SIGN_OPTS)
      )
    })
  });

  return fcl.send([
    fcl.transaction(cadence),
    fcl.args([]),
    fcl.payer(authz),
    fcl.proposer(authz),
    fcl.authorizations([authz]),
    fcl.limit(9999)
  ]).then(fcl.decode);
}
