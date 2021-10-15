import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center text-center gap-3 px-3 py-6 bg-base-secondary">
      <p>
        &copy; <span className="font-semibold">2021 Alunno</span> -{' '}
        {t('footer.description')}
      </p>
      <p>
        {t('footer.makeWithLove')} {t('footer.and')}{' '}
        <span className="font-semibold">Django React</span>
      </p>
      <div className="flex items-center gap-4">
        <Link to="/contact">{t('footer.contact')}</Link>
        <Link to="/about">{t('footer.about')}</Link>
      </div>
    </div>
  )
}

export default Footer
