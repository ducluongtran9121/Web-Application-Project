import { useTranslation } from 'react-i18next'

import { Flex, Text } from '@chakra-ui/react'

function UserDeadlines(): JSX.Element {
  const { t } = useTranslation()

  return (
    <Flex direction="column" alignItems="center">
      <Text textAlign="center" fontSize="3rem">
        🙃 {t('user.survived')}
      </Text>
    </Flex>
  )
}

export default UserDeadlines
