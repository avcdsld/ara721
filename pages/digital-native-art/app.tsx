import { useState } from 'react';
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

  // The signing key lives on the server (see functions/). The browser only asks
  // for one of two named actions and then watches the resulting transaction.
  const sendTx = async (action, callback, onFailure) => {
    try {
      fcl.config({
        "accessNode.api": network === "mainnet" ? "https://rest-mainnet.onflow.org" : "https://rest-testnet.onflow.org",
        "fcl.network": network || "testnet",
      });

      const res = await fetch('/api/art', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (res.status === 429) {
          notify(
            body.limit === 'daily'
              ? "Today's limit has been reached. Please come back tomorrow."
              : 'Too many requests. Please wait a moment.'
          );
        } else {
          notify('Something went wrong. Please try again later.');
        }
        onFailure();
        return;
      }

      const { transactionId } = await res.json();
      const unsub = fcl.tx(transactionId).subscribe((currentTx) => {
        try {
          if (fcl.tx.isSealed(currentTx)) {
            callback();
            unsub();
          }
        } catch (e) {
          onFailure();
          unsub();
        }
      });
    } catch (e) {
      console.log(e);
      notify('Something went wrong. Please try again later.');
      onFailure();
    }
  };

  const createArt = async () => {
    setIsLoadingCreation(true);
    await sendTx(
      'create',
      () => {
        setIsLoadingCreation(false);
        notify('Art has been created.');
      },
      () => setIsLoadingCreation(false)
    );
  }

  const destroyArt = async () => {
    setIsLoadingDestruction(true);
    await sendTx(
      'destroy',
      () => {
        setIsLoadingDestruction(false);
        notify('Art has been destroyed.');
      },
      () => setIsLoadingDestruction(false)
    );
  }

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
