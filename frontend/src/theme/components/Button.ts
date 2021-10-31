import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const sizeSm: SystemStyleFunction = () => ({
  p: '5px 11px 6px',
  fontWeight: 'normal',
  border: '1px solid',
  borderRadius: '4px',
})

const variantSolid: SystemStyleFunction = (props) => ({
  bg: mode('light.control.default', 'dark.control.default')(props),
  color: 'inherit',
  borderColor: mode('light.border.default', 'dark.border.default')(props),
  boxShadow: 'sm',

  _hover: {
    bg: mode('light.control.secondary', 'dark.control.secondary')(props),
  },

  _active: {
    bg: mode('light.control.ternary', 'dark.control.ternary')(props),
    boxShadow: 'none',
  },
})

const variantAccent: SystemStyleFunction = (props) => ({
  bg: mode('light.accent.default', 'dark.accent.default')(props),
  color: mode('light.text.inverse', 'dark.text.inverse')(props),
  borderColor: mode('light.border.accent', 'dark.border.accent')(props),
  boxShadow: 'sm',

  _hover: {
    bg: mode('light.accent.secondary', 'dark.accent.secondary')(props),
  },

  _active: {
    bg: mode('light.accent.ternary', 'dark.accent.ternary')(props),
    boxShadow: 'none',
  },
})

const Button = {
  baseStyles: {},
  sizes: {
    sm: sizeSm,
  },
  variants: {
    solid: variantSolid,
    accent: variantAccent,
  },
  defaultProps: {
    size: 'sm',
  },
}

export default Button
