import * as React from 'react'
import { I18nContext } from '../../i18n/i18n-react'
import { Flex, Text } from '@chakra-ui/react'

function UserOverview(): JSX.Element {
  const { LL } = React.useContext(I18nContext)

  return (
    <Flex direction="column" alignItems="center">
      <Text textAlign="center" fontSize="5rem">
        🥶
      </Text>
      <Text textAlign="center" fontSize="3rem">
        {LL.user.empty()}
      </Text>
    </Flex>
  )
}

export default UserOverview
