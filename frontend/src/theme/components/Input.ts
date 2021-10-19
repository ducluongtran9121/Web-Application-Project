import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const sizeSm: SystemStyleFunction = () => ({
  field: {
    borderRadius: '4px',
  },
})

const varianOutline: SystemStyleFunction = (props) => ({
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
  baseStyles: {},
  sizes: {
    sm: sizeSm,
  },
  variants: {
    outline: varianOutline,
  },
  defaultProps: {
    size: 'sm',
  },
}

export default Input
