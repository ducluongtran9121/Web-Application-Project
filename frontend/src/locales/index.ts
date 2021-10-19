import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// en
import commonEN from './en/common.json'
import signinEN from './en/signin.json'
import notfoundEN from './en/notfound.json'
import navbarEN from './en/navbar.json'
import footerEN from './en/footer.json'

// vi
import commonVI from './vi/common.json'
import signinVI from './vi/signin.json'
import notfoundVI from './vi/notfound.json'
import navbarVI from './vi/navbar.json'
import footerVI from './vi/footer.json'

const resources = {
  en: {
    translation: {
      common: commonEN,
      signin: signinEN,
      notfound: notfoundEN,
      navbar: navbarEN,
      footer: footerEN,
    },
  },
  vi: {
    translation: {
      common: commonVI,
      signin: signinVI,
      notfound: notfoundVI,
      navbar: navbarVI,
      footer: footerVI,
    },
  },
}

i18next.use(LanguageDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  resources,
})
