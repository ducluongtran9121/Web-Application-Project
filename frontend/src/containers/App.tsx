import * as React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { localStorageDetector, navigatorDetector } from 'typesafe-i18n/detectors'
import { ChakraProvider } from '@chakra-ui/react'
import TypesafeI18n from '../i18n/i18n-react'
import { detectLocale } from '../i18n/i18n-util'
import AuthProvider from '../contexts/AuthContext'
import theme from '../theme'

import PrivateElement from '../components/PrivateElement'
import PrivateElementContainer from './PrivateElementContainer'
import SignIn from './SignIn'

function App() {
  const detectedLocale = detectLocale(localStorageDetector, navigatorDetector)

  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', detectedLocale)
  }

  return (
    <TypesafeI18n initialLocale={detectedLocale}>
      <ChakraProvider theme={theme}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="signin" element={<SignIn />} />
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
        </Router>
      </ChakraProvider>
    </TypesafeI18n>
  )
}

export default App
