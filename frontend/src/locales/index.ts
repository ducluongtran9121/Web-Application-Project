import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

// en
import commonEN from './en/common.json'
import courseEN from './en/course.json'
import errorEN from './en/error.json'
import footerEN from './en/footer.json'
import homeEN from './en/home.json'
import navBarEN from './en/navbar.json'
import notFoundEN from './en/notfound.json'
import signInEN from './en/signin.json'
import userEN from './en/user.json'
// vi
import commonVI from './vi/common.json'
import courseVI from './vi/course.json'
import errorVI from './vi/error.json'
import footerVI from './vi/footer.json'
import homeVI from './vi/home.json'
import navBarVI from './vi/navbar.json'
import notFoundVI from './vi/notfound.json'
import signInVI from './vi/signin.json'
import userVI from './vi/user.json'

const resources = {
  en: {
    translation: {
      common: commonEN,
      signIn: signInEN,
      navBar: navBarEN,
      footer: footerEN,
      notFound: notFoundEN,
      error: errorEN,
      course: courseEN,
      user: userEN,
      home: homeEN,
    },
  },
  vi: {
    translation: {
      common: commonVI,
      signIn: signInVI,
      navBar: navBarVI,
      footer: footerVI,
      notFound: notFoundVI,
      error: errorVI,
      course: courseVI,
      user: userVI,
      home: homeVI,
    },
  },
}

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'vi'],
    resources,
  })
