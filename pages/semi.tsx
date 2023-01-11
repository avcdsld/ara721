import { useTranslation } from 'react-i18next';
import Container from 'components/Container';
import SemiSvg from 'components/SemiSvg';

export default function Semi() {
  const { t } = useTranslation();

  return (
    <Container title="Semi – ara721.art">
      <div className="justify-center max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-2 text-black dark:text-white">
          Semi
        </h1>
        <h3 className="mb-4 text-black dark:text-white">
          {t('semi.workInfo')}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">
          {t('semi.demoNote')}
        </p>
        <SemiSvg />

        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {t('semi.abstract')}
        </p>

        <div className="mb-8 prose dark:prose-dark leading-6">
          <h3>{t('semi.affectEachOthers')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('semi.affectEachOthersDescription')}
          </p>

          <h3>{t('semi.interactive')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('semi.interactiveDescription')}
          </p>

          <h3>{t('semi.composability')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('semi.composabilityDescription')}
          </p>

          <h3>{t('semi.betterMetadata')}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t('semi.betterMetadataDescription')}
          </p>

          <hr />

          <h3>{t('semi.links')}</h3>
          <ul className="text-gray-600 dark:text-gray-400 mb-8">
            <li>
              <a
                target="_blank"
                href="https://etherscan.io/address/0x287875b6bfcf8fa271478d8fed19a5c00c911afe#writeContract"
                rel="noreferrer"
              >
                Etherscan
              </a>
              <ul>
                <li>{t('semi.etherscanDescription')}</li>
              </ul>
            </li>
            <li>
              <a
                target="_blank"
                href="https://github.com/avcdsld/code-as-art/tree/main/semi"
                rel="noreferrer"
              >
                GitHub
              </a>
              <ul>
                <li>{t('semi.githubDescription')}</li>
              </ul>
            </li>
            <li>
              <a
                target="_blank"
                href="https://opensea.io/collection/semi-universe"
                rel="noreferrer"
              >
                OpenSea
              </a>
              <ul>
                <li>{t('semi.openseaDescription')}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
