import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const init = () => {
    if (i18n.isInitialized) {
        return;
    }

    return i18n
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
            resources: {
                en: {
                    translation: require('../locales/en.json')
                },
                ja: {
                    translation: require('../locales/ja.json')
                }
            },
            debug: process.env.NODE_ENV === "development",
            fallbackLng: 'en',
            interpolation: {
                escapeValue: false,
            },
        });
};

export default i18n;
