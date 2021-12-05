import { mode } from '@chakra-ui/theme-tools'
import type { SystemStyleFunction, StyleFunctionProps } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleFunction = (props: StyleFunctionProps) => ({
  bg: mode('light.card.default', 'dark.card.default')(props),
  border: '1px solid',
  borderColor: mode('light.border.card', 'dark.border.card')(props),
  borderRadius: '8px',
  p: '1.5rem'
})

const variantHoverable: SystemStyleFunction = (props: StyleFunctionProps) => ({
  _hover: {
    bg: mode('light.card.secondary', 'dark.card.secondary')(props)
  }
})

const variantClickable: SystemStyleFunction = (props: StyleFunctionProps) => ({
  _hover: {
    bg: mode('light.card.secondary', 'dark.card.secondary')(props),
    cursor: 'pointer'
  }
})

const variantSearch: SystemStyleFunction = (props: StyleFunctionProps) => ({
  bg: mode('light.card.solid', 'dark.card.solid')(props),
  p: '1rem'
})

const Card = {
  baseStyle,
  variants: {
    hoverable: variantHoverable,
    clickable: variantClickable,
    search: variantSearch
  }
}
export default Card
