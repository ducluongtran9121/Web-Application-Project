import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react'

interface Props extends BoxProps {}

function Card({ ...rest }: Props) {
  const bg = useColorModeValue('light.card.default', 'dark.card.default')
  const borderColor = useColorModeValue(
    'light.border.default',
    'dark.border.default'
  )
  return (
    <Box
      bg={bg}
      border="1px"
      boxShadow="sm"
      borderColor={borderColor}
      borderRadius="8px"
      p="1.5rem 2rem"
      {...rest}
    ></Box>
  )
}

export default Card
