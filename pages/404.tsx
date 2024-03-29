import Link from 'next/link';

import Container from 'components/Container';

export default function NotFound() {
  return (
    <Container title="404 – ara721.art">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-2xl md:text-4xl mb-4 text-black dark:text-gray-200">
          Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-200 mb-8">
          It seems you've found something that used to exist, or you spelled
          something wrong. I'm guessing you spelled something wrong. Can you
          double check that URL?
        </p>
        <Link
          href="/"
          className="p-1 sm:p-4 w-64 font-bold mx-auto bg-gray-200 dark:bg-gray-800 text-center rounded-md text-black dark:text-gray-200"
        >
          Return Home
        </Link>
      </div>
    </Container>
  );
}
