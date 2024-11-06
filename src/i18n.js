import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import huLandingPage from './locales/hu/LandingPage.json';
import enLandingPage from './locales/en/LandingPage.json';
import enAboutPage from './locales/en/AboutPage.json';
import huAboutPage from './locales/hu/AboutPage.json';
import hunavbar from './locales/hu/navbar.json';
import ennavbar from './locales/en/navbar.json';
import endash from './locales/en/dashboardPage.json';
import hudash from './locales/hu/dashboardPage.json';
import huauth from './locales/hu/LoginPage.json';
import enauth from './locales/en/LoginPage.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enLandingPage,
        landingPage: enLandingPage,
        aboutPage: enAboutPage,
        navbar: ennavbar,
        dashboard: endash,
        auth: enauth,
      },
      hu: {
        translation: huLandingPage,
        landingPage: huLandingPage,
        aboutPage: huAboutPage,
        navbar: hunavbar,
        dashboard: hudash,
        auth: huauth,
      },
    },
    lng: 'hu',  // Set Hungarian as the initial language
    fallbackLng: 'hu', // Fallback to Hungarian if no language is detected
    detection: {
      order: ['localStorage', 'path', 'subdomain'], // Browser language not checked
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
