import { useTranslation } from 'react-i18next';
import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '../components/Container';

export default function Home() {
  const { t } = useTranslation();

  return (
    <Suspense fallback={null}>
      <Container>
        <div className="flex flex-col justify-center items-start max-w-2xl border-gray-200 dark:border-gray-700 mx-auto pb-16">
          <div className="flex flex-col-reverse sm:flex-row items-start">
            <div className="flex flex-col pr-8">
              <h1 className="font-bold text-2xl md:text-4xl mb-4 text-black dark:text-gray-200">
                ara721.art
              </h1>
              <h2 className="text-gray-700 dark:text-gray-200 mb-4">
                {t('about.subTitle')}
              </h2>
              <p className="text-gray-600 dark:text-gray-200 mb-4">
                {t('about.description')}
              </p>
            </div>
            <div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
              <Image
                alt="Ara"
                height={176}
                width={176}
                src="/avatar.png"
                sizes="30vw"
                priority
                className="rounded-full filter grayscale"
              />
            </div>
          </div>

          <h3 className='text-gray-700 dark:text-gray-200 mt-4'>Links:</h3>
          <ul className='text-gray-600 dark:text-gray-200'>
            <li>
              Twitter: <a href="https://twitter.com/arandoros">@arandoros</a>
            </li>
            <li>
              GitHub: <a href="https://github.com/avcdsld">@avcdsld</a>
            </li>
            <li>
              Website:{' '}
              <Link href="https://ara-studio.life">ara-studio.life</Link>
            </li>
          </ul>
        </div>
      </Container>
    </Suspense>
  );
}
