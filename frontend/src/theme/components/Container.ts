import { mode } from '@chakra-ui/theme-tools'
import type {
  SystemStyleFunction,
  SystemStyleObject,
} from '@chakra-ui/theme-tools'

const variantCard: SystemStyleFunction = (props) => ({
  bg: mode('light.card.default', 'dark.card.default')(props),
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: mode('light.border.card', 'dark.border.card')(props),
  borderRadius: '4px',
  p: '1.5rem',
  maxW: '100%',
})

const baseStyle: SystemStyleObject = {
  w: '100%',
  mx: 'auto',
  maxW: '60ch',
  px: '1rem',
}

const Container = {
  baseStyle,
  variants: {
    card: variantCard,
  },
}

export default Container
