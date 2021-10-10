import * as React from 'react'
import { useTranslation } from 'react-i18next'
import {
  VStack,
  Flex,
  Heading,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  Box,
} from '@chakra-ui/react'
import logo from '@assets/svgs/logo.svg'
import Card from '@components/Card'
import Footer from '@components/Footer'

function Login() {
  const { t, i18n } = useTranslation()
  i18n.changeLanguage('en')

  return (
    <>
      <Box p="3rem 2rem 2rem" minW="100%" maxW="100vw" minH="100vh">
        <VStack spacing="1rem">
          <Image src={logo} w="8rem" alt="Logo of Alunno" />
          <Heading as="h1">{t('login.heading')}</Heading>
        </VStack>
        <Card minW="10rem" maxW="35rem" m="3rem auto">
          <form action="">
            <Flex direction="column" alignItems="stretch">
              <FormControl>
                <FormLabel>{t('login.username')}</FormLabel>
                <Input />
              </FormControl>
              <FormControl mt="1.5rem">
                <FormLabel>{t('login.password')}</FormLabel>
                <Input type="password" />
              </FormControl>
              <Button variant="accent" mt="2rem" fontSize="1em">
                {t('login.signIn')}
              </Button>
              <Link href="#" textAlign="center" mt="1rem">
                {t('login.forgotPassword')}
              </Link>
            </Flex>
          </form>
        </Card>
      </Box>
      <Footer />
    </>
  )
}

export default Login
