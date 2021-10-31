import { useTranslation } from 'react-i18next'

import { Flex, Text } from '@chakra-ui/react'

function UserOverview(): JSX.Element {
  const { t } = useTranslation()

  return (
    <Flex direction="column" alignItems="center">
      <Text textAlign="center" fontSize="5rem">
        🥶
      </Text>
      <Text textAlign="center" fontSize="3rem">
        {t('user.empty')}
      </Text>
    </Flex>
  )
}

export default UserOverview
