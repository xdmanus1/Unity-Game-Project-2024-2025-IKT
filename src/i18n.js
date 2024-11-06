import i18n from 'i18next';
import { initReactI18next, Translation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import huLandingPage from './locales/hu/LandingPage.json';
import enLandingPage from './locales/en/LandingPage.json';
import enAboutPage from './locales/en/AboutPage.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        Translation: enLandingPage,
        landingPage: enLandingPage,
        aboutPage: enAboutPage,
      },
      hu: {
        landingPage: huLandingPage,
      },
    },
    fallbackLng: 'en',
    detection: {
      order: ['navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    debug: true,
  })
  .then(() => {
    console.log('i18n initialized successfully');
  })
  .catch((err) => {
    console.error('i18n initialization error:', err);
  });

export default i18n;
