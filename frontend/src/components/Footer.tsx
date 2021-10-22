import {
  VStack,
  Text,
  Link,
  Flex,
  Container,
  useColorModeValue,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()
  const bg = useColorModeValue('light.base.secondary', 'dark.base.secondary')

  return (
    <>
      <VStack p="2rem" bg={bg}>
        <Container textAlign="center">
          <Text fontWeight="semibold" display="inline">
            &copy; 2021 Alunno
          </Text>{' '}
          <Text display="inline">- {t('footer.description')}.</Text>
        </Container>
        <Container textAlign="center">
          <Text display="inline">
            {t('footer.makeWithLove')} {t('footer.and')}{' '}
          </Text>
          <Text fontWeight="semibold" display="inline">
            Django React
          </Text>
        </Container>

        <Flex gridGap="1rem">
          <Link>{t('footer.contact')}</Link>
          <Link>{t('footer.about')}</Link>
        </Flex>
      </VStack>
    </>
  )
}

export default Footer
