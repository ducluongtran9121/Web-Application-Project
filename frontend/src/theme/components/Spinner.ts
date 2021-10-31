import { mode } from '@chakra-ui/theme-tools'
import type { SystemStyleFunction } from '@chakra-ui/theme-tools'

const variantAccent: SystemStyleFunction = (props) => ({
  color: mode('light.accent.default', 'dark.accent.default')(props),
  emptyColor: 'transparent',
})

const Spinner = {
  baseStyle: {},
  variants: {
    accent: variantAccent,
  },
}

export default Spinner
