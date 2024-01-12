import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Container from 'components/Container';

export default function Protein() {
  const { t } = useTranslation();

  return (
    <Container title="Protein – ara721.art">
      <div className="justify-center max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-2xl md:text-4xl mb-2 text-black dark:text-gray-200">
          Protein
        </h1>
        <h2 className="font-bold text-2xl md:text-3xl mb-4 text-black dark:text-gray-200">
          {t('protein.subTitle')}
        </h2>
        <h3 className="mb-4 text-black dark:text-gray-200">
          {t('protein.workInfo')}
        </h3>
        <Image
          alt="Protein"
          height={400}
          width={400}
          src="/static/images/protein.gif"
          className="mt-4 mb-8"
          priority
        />
        <p className="text-gray-600 dark:text-gray-200 mb-8 prose">
          {t('protein.abstract')}
        </p>

        <div className="mb-8 prose dark:prose-dark leading-6">
          <h3>{t('protein.replication')}</h3>
          <p className="text-gray-600 dark:text-gray-200 mb-8">
            {t('protein.replicationDescription')}
          </p>

          <h3>{t('protein.influence')}</h3>
          <p className="text-gray-600 dark:text-gray-200 mb-8">
            {t('protein.influenceDescription')}
          </p>

          <h3>{t('protein.limit')}</h3>
          <p className="text-gray-600 dark:text-gray-200 mb-8">
            {t('protein.limitDescription')}
          </p>

          <hr />

          <h3>{t('protein.links')}</h3>
          <ul className="text-gray-600 dark:text-gray-200 mb-8">
            <li>
              <a
                target="_blank"
                href="https://etherscan.io/token/0x8bb17c196fa43ef52d4d4925eb3984e8c9fe61c7#writeContract"
                rel="noreferrer"
              >
                Etherscan
              </a>
              <ul>
                <li>{t('protein.etherscanDescription')}</li>
              </ul>
            </li>
            <li>
              <a
                target="_blank"
                href="https://github.com/avcdsld/code-as-art/tree/main/protein"
                rel="noreferrer"
              >
                GitHub
              </a>
              <ul>
                <li>{t('protein.githubDescription')}</li>
              </ul>
            </li>
            <li>
              <a
                target="_blank"
                href="https://opensea.io/collection/protein-art"
                rel="noreferrer"
              >
                OpenSea
              </a>
              <ul>
                <li>{t('protein.openseaDescription')}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
