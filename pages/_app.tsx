import 'styles/global.css';

import { I18nextProvider } from 'react-i18next';
import i18n, { init } from '../lib/i18n';
import { ThemeProvider } from 'next-themes';
import { Inter } from '@next/font/google';

const interVariable = Inter();

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  init();

  return (
    <ThemeProvider attribute="class">
      <I18nextProvider i18n={i18n}>
        <main className={interVariable.className}>
          <Component {...pageProps} />
        </main>
      </I18nextProvider>
    </ThemeProvider>
  );
}
