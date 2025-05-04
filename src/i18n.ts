import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './locales/translations';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: translations.en,
      ar: translations.ar,
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;