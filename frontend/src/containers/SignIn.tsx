import * as React from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { I18nContext } from '../i18n/i18n-react'
import { Box, Button, Flex, FormControl, FormLabel, Heading, Link, Image, Input, Alert, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react'
import type { LocalizedString } from 'typesafe-i18n'

import { ReactComponent as Logo } from '../assets/svg/logo.svg'
import Card from '../components/Card'
import Footer from '../components/Footer'

function SignIn(): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const { signIn } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)
  const [isLoading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string>('')

  // location user try to visit before authentication
  const fromLocation = location.state?.from?.pathname || '/'

  function errorMessage(err: unknown): LocalizedString {
    if (axios.isAxiosError(err)) {
      if (!err.response) return LL.error.network()
      else {
        const errorStatus = err.response.status

        switch (errorStatus) {
          case 400:
          case 401:
            return LL.error.incorrectEmailPassword()
          default:
            return LL.error.default()
        }
      }
    }

    return LL.error.default()
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()

    setLoading(true)

    try {
      await signIn({ email: emailRef.current?.value, password: passwordRef.current?.value })
      navigate(fromLocation, { replace: true })
    } catch (err) {
      setError(errorMessage(err))
      setLoading(false)
    }
  }

  function handleCloseErrorBadge(): void {
    setError('')
  }

  return (
    <Box>
      <Box p="3rem 1rem" minW="100%" maxW="100vw" minH="100vh">
        <Flex direction="column" alignItems="center" gridGap="0.75rem">
          <Image as={Logo} w="10rem" alt={LL.common.logoAlt()} />
          <Heading fontSize="3rem">{LL.signIn.heading()}</Heading>
        </Flex>
        <Box minW="10rem" maxW="40rem" mx="auto" mt="2rem">
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>{error}</AlertTitle>
              <CloseButton position="absolute" top="0.5rem" right="0.75rem" onClick={() => handleCloseErrorBadge()} />
            </Alert>
          )}
          <Card as="form" display="flex" flexDirection="column" gridGap="1.5rem" mt="0.75rem" px="2.5rem" onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel htmlFor="email_field">{LL.signIn.email()}</FormLabel>
              <Input type="text" spellCheck={false} id="email_field" ref={emailRef} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password_field">{LL.signIn.password()}</FormLabel>
              <Input type="password" id="password_field" ref={passwordRef} />
            </FormControl>
            <Button type="submit" mt="0.5rem" variant="accent" isLoading={isLoading} loadingText="Signing you in...">
              {LL.signIn.signIn()}
            </Button>
            <Link href="#">{LL.signIn.forgotPassword()}</Link>
          </Card>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export default SignIn
