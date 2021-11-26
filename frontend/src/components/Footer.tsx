import * as React from 'react'
import { Flex, Link, Text } from '@chakra-ui/react'
import { I18nContext } from '../i18n/i18n-react'
import type { FlexProps } from '@chakra-ui/react'

function Footer({ ...rest }: FlexProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)

  return (
    <Flex direction="column" alignItems="center" p="2rem 1rem" gridGap="0.5rem" {...rest}>
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
