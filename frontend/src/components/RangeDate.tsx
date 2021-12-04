import * as React from 'react'
import { Text, useColorModeValue } from '@chakra-ui/react'
import type { TextProps } from '@chakra-ui/react'

interface RangeDateProps extends TextProps {
  begin: Date
  end: Date
}

function RangeDate({ begin, end, ...rest }: RangeDateProps): JSX.Element {
  const attentionColor = useColorModeValue('light.status.attention', 'dark.status.attention')

  return (
    <Text fontWeight="semibold" color={attentionColor} {...rest}>
      {`${begin.toLocaleDateString()} ${begin.toLocaleTimeString()} - ${end.toLocaleDateString()} ${end.toLocaleTimeString()}`}
    </Text>
  )
}

export default RangeDate
