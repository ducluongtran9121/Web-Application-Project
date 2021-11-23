import { inputAnatomy as parts } from '@chakra-ui/anatomy'
import { mode } from '@chakra-ui/theme-tools'
import type { PartsStyleFunction, StyleFunctionProps } from '@chakra-ui/theme-tools'

const variantOutline: PartsStyleFunction<typeof parts> = (props: StyleFunctionProps) => ({
  field: {
    bg: mode('light.control.default', 'dark.control.default')(props),
    color: 'inherit',
    border: '1px solid',
    borderColor: mode('light.border.control', 'dark.border.control')(props),
    shadow: 'sm',

    _hover: {
      bg: mode('light.control.secondary', 'dark.control.secondary')(props),
      borderColor: mode('light.border.default', 'dark.border.default')(props)
    }
  }
})

const Input = {
  parts: parts.keys,
  baseStyles: {},
  variants: {
    outline: variantOutline
  }
}

export default Input
