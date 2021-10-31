import { inputAnatomy as parts } from '@chakra-ui/anatomy'
import {
  mode,
  PartsStyleFunction,
  SystemStyleFunction,
} from '@chakra-ui/theme-tools'

const sizeSm: SystemStyleFunction = () => ({
  field: {
    borderRadius: '4px',
    py: '5px',
    px: '11px',
  },
})

const variantOutline: PartsStyleFunction<typeof parts> = (props) => ({
  field: {
    bg: mode('light.control.default', 'dark.control.default')(props),
    color: 'inherit',
    border: '1px solid',
    borderColor: mode('light.border.default', 'dark.border.default')(props),
    boxShadow: 'sm',

    _hover: {
      bg: mode('light.control.secondary', 'dark.control.secondary')(props),
      borderColor: mode('light.border.default', 'dark.border.default')(props),
    },
  },
})

const Input = {
  parts: parts.keys,
  baseStyles: {},
  sizes: {
    sm: sizeSm,
  },
  variants: {
    outline: variantOutline,
  },
  defaultProps: {
    size: 'sm',
  },
}

export default Input
