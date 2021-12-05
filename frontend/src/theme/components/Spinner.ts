import { mode } from '@chakra-ui/theme-tools'
import type { SystemStyleFunction } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleFunction = (props) => ({
  color: mode('light.accent.default', 'dark.accent.default')(props),
  emptyColor: 'transparent'
})

const Spinner = {
  baseStyle: baseStyle
}

export default Spinner
