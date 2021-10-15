import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// en
import signinEn from './en/signin.json'
import footerEN from './en/footer.json'
import notfoundEN from './en/notfound.json'

// vi
import signinVI from './vi/signin.json'
import footerVI from './vi/footer.json'
import notfoundVI from './vi/notfound.json'

const resources = {
  en: {
    translation: {
      signin: signinEn,
      footer: footerEN,
      notfound: notfoundEN,
    },
  },
  vi: {
    translation: {
      signin: signinVI,
      footer: footerVI,
      notfound: notfoundVI,
    },
  },
}

i18next.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  resources,
})
