import * as React from 'react'
import { I18nContext } from '../../i18n/i18n-react'
import { Flex, Text } from '@chakra-ui/react'

function UserDeadlines(): JSX.Element {
  const { LL } = React.useContext(I18nContext)

  return (
    <Flex direction="column" alignItems="center">
      <Text textAlign="center" fontSize="3rem">
        🙃 {LL.user.survived()}
      </Text>
    </Flex>
  )
}

export default UserDeadlines
