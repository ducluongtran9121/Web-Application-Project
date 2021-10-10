import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// en
import commonEN from './en/common.json'
import loginEn from './en/login.json'
import footerEN from './en/footer.json'

// vi
import commonVI from './vi/common.json'
import loginVI from './vi/login.json'
import footerVI from './vi/footer.json'


const resources = {
  en: {
    translation: {
      common: commonEN,
      login: loginEn,
      footer: footerEN
    },
  },
  vi: {
    translation: {
      common: commonVI,
      login: loginVI,
      footer: footerVI
    },
  },
}

i18next.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  resources,
})
