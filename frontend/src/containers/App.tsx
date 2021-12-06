import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { localStorageDetector, navigatorDetector } from 'typesafe-i18n/detectors'
import AuthProvider from '../contexts/AuthContext'
import NotificationProvider from '../contexts/NotificationContext'
import { ChakraProvider } from '@chakra-ui/react'
import TypesafeI18n from '../i18n/i18n-react'
import { detectLocale } from '../i18n/i18n-util'
import theme from '../theme'
import SignIn from './SignIn'
import About from './About'
import PrivateElement from '../components/PrivateElement'
import PrivateElementContainer from './PrivateElementContainer'

function App() {
  const detectedLocale = detectLocale(localStorageDetector, navigatorDetector)

  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', detectedLocale)
  }

  return (
    <Router>
      <ChakraProvider theme={theme}>
        <TypesafeI18n initialLocale={detectedLocale}>
          <NotificationProvider>
            <AuthProvider>
              <Routes>
                <Route path="signin" element={<SignIn />} />
                <Route path="about" element={<About />} />
                <Route
                  path="/*"
                  element={
                    <PrivateElement>
                      <PrivateElementContainer />
                    </PrivateElement>
                  }
                />
              </Routes>
            </AuthProvider>
          </NotificationProvider>
        </TypesafeI18n>
      </ChakraProvider>
    </Router>
  )
}

export default App
