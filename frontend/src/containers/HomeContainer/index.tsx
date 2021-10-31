import { useTranslation } from 'react-i18next'

import { Box, Flex, Text } from '@chakra-ui/react'

import Footer from '../../components/Footer'
import HomeCourses from './HomeCourses'
import HomeDeadlines from './HomeDeadlines'

function Home(): JSX.Element {
  const { t } = useTranslation()

  return (
    <Box>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Box
          sx={{ position: { base: 'block', md: 'sticky' }, top: '0' }}
          flexGrow={1}
          flexShrink={0}
          maxW={{ base: 'full', md: '17rem' }}
          px="1rem"
          pt="2rem"
          alignSelf="flex-start"
        >
          <Text fontWeight="semibold">{t('home.deadlines')}</Text>
          <HomeDeadlines />
        </Box>
        <Box flexGrow={1} px="1rem" mt="2rem">
          <Text fontWeight="semibold">{t('home.allCourses')}</Text>
          <HomeCourses />
          <Footer isBackgroundTransparent={true} />
        </Box>
      </Flex>
    </Box>
  )
}

export default Home
