import axios from 'axios'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
} from '@chakra-ui/react'
import { IoCloseCircle } from 'react-icons/io5'

import logo from '../assets/svgs/logo.svg'

import Footer from '../components/Footer'
import { useAuth } from '../contexts/AuthContext'

function SignIn(): JSX.Element {
  const history = useHistory()
  const { signIn, checkTokenExpired } = useAuth()
  const { t } = useTranslation()
  const [errorMessage, setErrorMessage] = React.useState<string>('')
  const [isLoading, setLoading] = React.useState<boolean>(false)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(
    () => {
      async function checkToken() {
        if (!(await checkTokenExpired())) history.push('/')
      }
      checkToken()
    }, // eslint-disable-next-line
    [],
  )

  function handleCloseErrorBar() {
    setErrorMessage('')
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      })
      setLoading(false)
      history.push('/')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (!err.response) {
          setErrorMessage(t('error.network'))
        } else if (
          err.response?.status === 400 ||
          err.response?.status === 401
        ) {
          setErrorMessage(t('error.incorrectEmailPassword'))
        } else setErrorMessage(t('error.default'))
      } else setErrorMessage(t('error.default'))

      setLoading(false)
    }
  }

  return (
    <Box>
      <Box
        minW="100%"
        maxW="100vw"
        minH="100vh"
        px={{ base: '0.75rem', md: '1.5rem' }}
        py="3rem"
      >
        <Flex direction="column" alignItems="center" gridGap="0.5rem">
          <Image src={logo} alt={t('logoAlt')} w="8rem" />
          <Heading as="h1" textAlign="center" fontSize="3rem">
            {t('signIn.hero')}
          </Heading>
        </Flex>
        <Box minW="10rem" maxW="35rem" mx="auto" mt="3rem">
          {errorMessage && (
            <Alert status="error">
              <AlertIcon as={IoCloseCircle} />
              <AlertTitle>{errorMessage}</AlertTitle>
              <CloseButton
                position="absolute"
                top="0.5rem"
                right="0.75rem"
                onClick={() => handleCloseErrorBar()}
              />
            </Alert>
          )}
          <Container as="form" variant="card" mt="0.5rem">
            <Flex direction="column" gridGap="0.5rem">
              <FormControl>
                <FormLabel htmlFor="email_field">{t('signIn.email')}</FormLabel>
                <Input
                  disabled={isLoading}
                  ref={emailRef}
                  type="email"
                  id="email_field"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password_field">
                  {t('signIn.password')}
                </FormLabel>
                <Input
                  disabled={isLoading}
                  ref={passwordRef}
                  type="password"
                  id="password_field"
                />
              </FormControl>
              <Button
                onClick={handleSignIn}
                disabled={isLoading}
                type="submit"
                variant="accent"
                fontWeight="semibold"
                mt="0.75rem"
              >
                {t('signIn.signIn')}
              </Button>
              <Link>{t('signIn.forgotPassword')}</Link>
            </Flex>
          </Container>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default SignIn
