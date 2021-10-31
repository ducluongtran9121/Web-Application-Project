import { useTranslation } from 'react-i18next'

import { Flex, Link, Text } from '@chakra-ui/react'
import { StackProps } from '@chakra-ui/react'
import { useColorModeValue } from '@chakra-ui/react'

interface Props extends StackProps {
  isBackgroundTransparent?: boolean
}

function Footer({ isBackgroundTransparent, ...rest }: Props): JSX.Element {
  const { t } = useTranslation()

  const baseBg = useColorModeValue(
    'light.base.secondary',
    'dark.base.secondary',
  )

  return (
    <Flex
      direction="column"
      alignItems="center"
      px={{ base: '0.75rem', md: '1.5rem' }}
      py="1.5rem"
      textAlign="center"
      bg={isBackgroundTransparent ? 'transparent' : baseBg}
      gridGap="0.5rem"
      {...rest}
    >
      <Text>
        &copy;{' '}
        <Text as="span" fontWeight="semibold">
          2021 Alunno
        </Text>
        {' - '}
        {t('footer.description')}
      </Text>
      <Text>
        {t('footer.makeWithLove')} {t('footer.and')}{' '}
        <Text as="span" fontWeight="semibold">
          Django React
        </Text>
      </Text>

      <Flex gridGap="0.75rem">
        <Link>{t('footer.contact')}</Link>
        <Link>{t('footer.about')}</Link>
      </Flex>
    </Flex>
  )
}

export default Footer
