import { useTranslation } from 'react-i18next';
import Image from 'next/image';

export default function ImplicitAgreementApp() {
  const { t } = useTranslation();

  return (
    <div className="full">
      <div className="justify-center max-w-2xl mx-auto p-16">
        <h1 className="font-bold text-2xl md:text-4xl mb-8">
          IMPLICIT AGREEMENT
        </h1>

        <iframe
          className="flex items-center mb-4"
          id="inlineFrameExample"
          title="Inline Frame Example"
          width="100%"
          height="400"
          src="/static/implicit-agreement/terms.html"
        >
        </iframe>

        <div className="flex items-center ml-2 mt-8 mb-8">
          <input checked id="ia-checkbox" type="checkbox" value="" className="h-4 w-4 accent-gray-200 rounded cursor-not-allowed" />
          <label htmlFor="ia-checkbox" className="ml-2 text-gray-300">I agree with the terms and conditions.</label>
        </div>

        <div className="mb-8 flex items-center">
          <button className="bg-gray-500 hover:bg-gray-400 text-white rounded px-4 py-2">Own an Ethereum NFT</button>
        </div>
      </div>
    </div>
  );
}
