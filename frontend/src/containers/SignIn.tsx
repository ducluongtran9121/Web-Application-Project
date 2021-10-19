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
import logo from '../assets/svgs/logo.svg'
import Footer from '../components/Footer'
import Card from '../components/Card'

function SignIn() {
  const { t } = useTranslation()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <Box>
      <Box p="3rem 2rem 2rem" minW="100%" maxW="100vw" minH="100vh">
        <VStack spacing="1rem">
          <Image src={logo} w="8rem" alt={t('common.logoAlt')} />
          <Heading as="h1">{t('signin.hero')}</Heading>
        </VStack>
        <Card
          as="form"
          onSubmit={handleSubmit}
          minW="10rem"
          maxW="35rem"
          m="3rem auto"
        >
          <Flex direction="column" alignItems="stretch">
            <FormControl>
              <FormLabel>{t('signin.username')}</FormLabel>
              <Input />
            </FormControl>
            <FormControl mt="1.5rem">
              <FormLabel>{t('signin.password')}</FormLabel>
              <Input type="password" />
            </FormControl>
            <Button variant="accent" type="submit" mt="2rem" fontSize="1em">
              {t('signin.signIn')}
            </Button>
            <Link href="#" textAlign="center" mt="1rem">
              {t('signin.forgotPassword')}
            </Link>
          </Flex>
        </Card>
      </Box>
      <Footer />
    </Box>
  )
}

export default SignIn
