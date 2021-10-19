import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'

interface Props extends BoxProps {}

function Card({ ...rest }: Props) {
  return (
    <Box
      bg={useColorModeValue('light.card.default', 'dark.card.default')}
      border="1px"
      boxShadow="sm"
      borderColor={useColorModeValue(
        'light.border.default',
        'dark.border.default'
      )}
      borderRadius="8px"
      p="1.5rem 2rem"
      {...rest}
    ></Box>
  )
}

export default Card
