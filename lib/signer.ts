import { SHA3 } from 'sha3';
import { secp256k1 } from '@noble/curves/secp256k1.js';

const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;

// `prehash: false` because the message is already a SHA3-256 digest, and
// `lowS: false` to keep the signatures byte-compatible with the previous
// elliptic-based implementation.
const SIGN_OPTS = { lowS: false, prehash: false };

export default function sign(message) {
  const sig = secp256k1.sign(hash(message), hexToBytes(PRIVATE_KEY), SIGN_OPTS);
  return bytesToHex(sig);
}

const hash = (message) => {
  const sha = new SHA3(256);
  sha.update(Buffer.from(message, 'hex'));
  return new Uint8Array(sha.digest());
};

const hexToBytes = (hex) =>
  Uint8Array.from(hex.match(/.{1,2}/g).map((b) => parseInt(b, 16)));

const bytesToHex = (bytes) =>
  Array.from(bytes, (b: number) => b.toString(16).padStart(2, '0')).join('');
