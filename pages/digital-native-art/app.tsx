import sign from '../../lib/signer';
import { useState, useRef, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import * as fcl from "@onflow/fcl";

const network = 'mainnet';

export default function DigitalNativeArtApp() {
  const [isLoadingCreation, setIsLoadingCreation] = useState(false);
  const [isLoadingDestruction, setIsLoadingDestruction] = useState(false);

  const notify = (message) => toast(message, {
    style: {
      borderRadius: '10px',
      background: '#111',
      color: '#fff',
      fontSize: '2.6vw',
      minWidth: 500,
      minHeight: 120,
    },
  });

  const txInfo = {
    aterilerAddress: '0x8c1f11aac68c6777',
    senderAddress: '0x8c1f11aac68c6777',
    senderKeyId: 2,
  };

  const sendTx = async (txCode, callback) => {
    try {
      fcl.config({
        "accessNode.api": network === "mainnet" ? "https://rest-mainnet.onflow.org" : "https://rest-testnet.onflow.org",
        "fcl.network": network || "testnet",
      });
      const authz = async (account) => {
        const addr = txInfo.senderAddress;
        const keyId = txInfo.senderKeyId;
        return {
          ...account,
          tempId: `${addr}-${keyId}`,
          addr: fcl.sansPrefix(addr),
          keyId: Number(keyId),
          signingFunction: async (signable) => {
            return {
              addr: fcl.withPrefix(addr),
              keyId: Number(keyId),
              signature: sign(signable.message)
            }
          }
        }
      };
      const tx = await fcl.send([
        fcl.transaction(txCode),
        fcl.args([]),
        fcl.payer(authz),
        fcl.proposer(authz),
        fcl.authorizations([authz]),
        fcl.limit(9999)
      ]);
      console.log(tx.transactionId);
      const unsub = fcl.tx(tx).subscribe((currentTx) => {
        try {
          console.log(currentTx);
          if (fcl.tx.isSealed(currentTx)) {
            console.log('Transaction is Sealed');
            callback();
            unsub();
          }
        } catch (e) {
          setIsLoadingCreation(false);
          setIsLoadingDestruction(false);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const createArt = async () => {
    try {
      setIsLoadingCreation(true);
      const txCode = `\
import Atelier from ${txInfo.aterilerAddress}

transaction {
    prepare(signer: AuthAccount) {
        Atelier.createArt()
    }
}`;
      const callback = () => {
        setIsLoadingCreation(false);
        notify('Art has been created.');
      }
      await sendTx(txCode, callback);
    } catch (e) {
      console.log(e);
    }
  }

  const destroyArt = async () => {
    try {
      setIsLoadingDestruction(true);
      const txCode = `\
import Atelier from ${txInfo.aterilerAddress}

transaction {
    prepare(signer: AuthAccount) {
        let uuids = Atelier.getUUIDs()
        Atelier.destroyArt(uuid: uuids[0])
    }
}`;
      const callback = () => {
        setIsLoadingDestruction(false);
        notify('Art has been destroyed.');
      }
      await sendTx(txCode, callback);
    } catch (e) {
      console.log(e);
      setIsLoadingDestruction(false);
    }
  }

  useEffect(() => {
  }, []);

  return (
    <div className="digitaiNativeArtApp">
      <div className="h-screen w-screen flex justify-center items-center">
        <div><Toaster /></div>
        <div className="p-8 mx-auto max-w-screen-xl text-center items-center">
          <div className="mb-24">
            <p className="p-8">どなたでもご自由に操作してください。</p>
            <p>Please feel free to touch this.</p>
          </div>
          <button
            aria-label="Create Art"
            type="button"
            className="mb-32 bg-black rounded-lg items-center justify-center"
            disabled={isLoadingCreation || isLoadingDestruction}
            onClick={createArt}
          >
            {!isLoadingCreation ?
              <div className="p-8 pr-16 pl-16">
                Create `Art`
              </div>
              :
              <div className="p-8 pr-16 pl-16 flex items-center justify-center">
                Creating&nbsp;
                <div className="animate-ping h-2 w-2 bg-white rounded-full"></div>
                <div className="animate-ping h-2 w-2 bg-white rounded-full mx-4"></div>
                <div className="animate-ping h-2 w-2 bg-white rounded-full"></div>
              </div>
            }

          </button>
          <br />

          <button
            aria-label="Create & Destroy Art"
            type="button"
            className="bg-black rounded-lg items-center justify-center"
            disabled={isLoadingCreation || isLoadingDestruction}
            onClick={destroyArt}
          >
            {!isLoadingDestruction ?
              <div className="p-8 pr-16 pl-16">
                Destroy `Art`
              </div>
              :
              <div className="p-8 pr-16 pl-16 flex items-center justify-center">
                Destroying&nbsp;
                <div className="animate-ping h-2 w-2 bg-white rounded-full"></div>
                <div className="animate-ping h-2 w-2 bg-white rounded-full mx-4"></div>
                <div className="animate-ping h-2 w-2 bg-white rounded-full"></div>
              </div>
            }
          </button>
        </div>
      </div>
    </div>
  );
}
