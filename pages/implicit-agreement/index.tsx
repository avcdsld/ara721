import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Container from 'components/Container';
import useWindowSize from 'hooks/useWindowSize';

export default function ImplicitAgreement() {
  const { t } = useTranslation();
  const [width] = useWindowSize();

  return (
    <Container title="Implicit agreement – ara721.art">
      <div className="justify-center max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-2xl md:text-4xl mb-4 text-black dark:text-gray-200">
          Implicit agreement
        </h1>
        <h3 className="mb-4 text-black dark:text-gray-200">
          {t('implicitAgreement.workInfo')}
        </h3>
        {/* <Image
          alt="Mutation"
          height={400}
          width={600}
          src="/static/images/mutation.png"
          className="mt-4 mb-8"
        /> */}
        <p className="text-gray-600 dark:text-gray-200 mb-8 prose">
          {t('implicitAgreement.abstract')}
        </p>

        <p className="text-black dark:text-gray-200 mb-8">
          <a
            target="_blank"
            href="/implicit-agreement/app"
            rel="noreferrer"
          >
            {'->'} Website
          </a>
        </p>
      </div>
    </Container>
  );
}
