import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../translations/en.json';
import viTranslation from '../translations/vi.json';
import zhTranslation from '../translations/zh.json';

const resources = {
    en: {
        translation: enTranslation,
    },
    vi: {
        translation: viTranslation,
    },
    zh: {
        translation: zhTranslation,
    },
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'vi', // Vietnamese as default language
        lng: undefined, // Let the detector determine the language
        debug: process.env.NODE_ENV === 'development',

        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },

        detection: {
            order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
            lookupQuerystring: 'lng',
            lookupLocalStorage: 'i18nextLng',
            caches: ['localStorage'],
        },

        // Define supported languages
        supportedLngs: ['vi', 'en', 'zh'],
        nonExplicitSupportedLngs: false,
    });

export default i18n;
