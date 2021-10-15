import * as React from 'react'
import { useTranslation } from 'react-i18next'
import logo from '../assets/svgs/logo.svg'
import Footer from '../components/Footer'

function SignIn() {
  const { t, i18n } = useTranslation()
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <>
      <div className="max-w-screen min-w-full min-h-screen px-6 py-10">
        <div className="flex flex-col items-center gap-3">
          <img className="w-32" src={logo} alt="Logo of Alunno" />
          <h1 className="text-4.5xl font-bold text-center">
            {t('signin.hero')}
          </h1>
        </div>
        <div className="card min-w-40 max-w-140 mx-auto mt-6 px-9 py-6 ">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="username_field">
                {t('signin.username')}
              </label>
              <input
                className="text-box"
                type="text"
                name="username_field"
                id="username_field"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="password_field">
                {t('signin.password')}
              </label>
              <input
                className="text-box"
                type="text"
                name="password_field"
                id="password_field"
              />
            </div>
            <button className="mt-3 btn-accent" type="submit">
              {t('signin.signIn')}
            </button>
            <a href="#">{t('signin.forgotPassword')}</a>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SignIn
