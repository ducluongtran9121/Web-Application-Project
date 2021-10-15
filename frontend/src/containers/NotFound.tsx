import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Footer from '../components/Footer'

function NotFound() {
  const { t, i18n } = useTranslation()

  return (
    <div className="min-h-screen grid grid-rows-not-found">
      <div className="flex flex-col gap-6 m-auto text-center">
        <p className="text-8xl whitespace-nowrap">¯\_(ツ)_/¯</p>
        <h1 className="text-4.5xl font-semibold">{t('notfound.hero')}</h1>
        <p className="text-2xl">{t('notfound.description')}</p>
        <Link className="mt-3" to="/">
          <button className="btn-accent">{t('notfound.home')}</button>
        </Link>
      </div>
      <Footer />
    </div>
  )
}

export default NotFound
