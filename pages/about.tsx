import Link from 'next/link';
import Image from 'next/image';

import Container from 'components/Container';
import avatar from 'public/avatar.png';

export default function About() {
  return (
    <Container title="About – ara721.art">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-2xl md:text-4xl mb-4 text-black dark:text-gray-200">
          About Me
        </h1>
        <div className="mb-8 prose dark:prose-dark leading-6">
          <h2>Links</h2>
          <ul>
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
          <h2>Bio</h2>
          <p>
            Ara is an NFT enthusiast, engineer and artist. He started developing
            smart contracts and dapps in 2017. In 2019, he developed the NFT
            marketplace miime. Since the end of 2020, he has been a Tech
            Ambassador for Flow blockchain, contributing to the development of
            the Flow ecosystem. Since August 2021 he has been developing the NFT
            project at Mercari Inc. He has always been interested in designing
            and building permanent digital items.
          </p>
          <div className="flex space-x-8">
            <a href="/avatar.jpg">
              <Image
                alt="Ara"
                width={400}
                quality={100}
                src={avatar}
                className="rounded-md"
              />
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
