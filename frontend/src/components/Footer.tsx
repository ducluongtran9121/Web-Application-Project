import * as React from 'react'
import { Flex, Link, Text, useColorModeValue } from '@chakra-ui/react'
import { I18nContext } from '../i18n/i18n-react'

import type { FlexProps } from '@chakra-ui/react'

interface FooterProps extends FlexProps {
  isBackgroundTransparent?: boolean
}

function Footer({ isBackgroundTransparent }: FooterProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const baseBg = useColorModeValue('light.base.secondary', 'dark.base.secondary')

  return (
    <Flex bg={isBackgroundTransparent ? 'transparent' : baseBg} direction="column" alignItems="center" p="2rem 1rem" gridGap="0.5rem">
      <Text>
        &copy;{' '}
        <Text as="span" fontWeight="semibold">
          2021 Alunno
        </Text>
        {' - '}
        {LL.footer.description()}
      </Text>
      <Text>
        {LL.footer.makeWithLove()} {LL.footer.and()}{' '}
        <Text as="span" fontWeight="semibold">
          Django React
        </Text>
      </Text>
      <Flex gridGap="0.75rem">
        <Link>{LL.footer.contact()}</Link>
        <Link>{LL.footer.about()}</Link>
      </Flex>
    </Flex>
  )
}

export default Footer
