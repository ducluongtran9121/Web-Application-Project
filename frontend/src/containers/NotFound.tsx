import { Link as ReactLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Flex, Heading, Grid, Text, Button } from '@chakra-ui/react'
import Footer from '../components/Footer'

function NotFound() {
  const { t } = useTranslation()

  return (
    <Grid templateRows="1fr auto" minH="100vh" alignItems="center">
      <Flex direction="column" gridGap="1rem" textAlign="center">
        <Text whiteSpace="nowrap" fontSize="7xl">
          ¯\_(ツ)_/¯
        </Text>
        <Heading as="h1" fontSize="5xl">
          {t('notfound.hero')}
        </Heading>
        <Text fontSize="2xl">{t('notfound.description')}</Text>
        <ReactLink to="/">
          <Button variant="accent">{t('notfound.home')}</Button>
        </ReactLink>
      </Flex>
      <Footer />
    </Grid>
  )
}

export default NotFound
