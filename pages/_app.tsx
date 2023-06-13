import 'styles/global.css';

import { I18nextProvider } from 'react-i18next';
import i18n, { init } from '../lib/i18n';
import { ThemeProvider } from 'next-themes';
import { Inter, Roboto_Mono } from '@next/font/google';

const interVariable = Inter();

const robotoMono = Roboto_Mono({
  weight: "400",
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  init();

  return (
    <ThemeProvider attribute="class" themes={["dark"]}>
      <I18nextProvider i18n={i18n}>
        <main className={`${interVariable.className} ${robotoMono.className}`}>
          <Component {...pageProps} />
        </main>
      </I18nextProvider>
    </ThemeProvider>
  );
}
