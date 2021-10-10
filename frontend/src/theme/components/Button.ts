import { mode } from '@chakra-ui/theme-tools'

const Button = {
  baseStyles: {},
  sizes: {
    sm: {
      p: '1px 16px 1px',
      borderRadius: '4px',
      border: '1px solid',
    },
  },
  variants: {
    solid: (props: any) => ({
      bg: mode('light.control.default', 'dark.control.default')(props),
      borderColor: mode('light.border.default', 'dark.border.default')(props),
      boxShadow: 'sm',

      _hover: {
        bg: mode('light.control.secondary', 'dark.control.secondary')(props),
      },

      _active: {
        bg: mode('light.control.ternary', 'dark.control.ternary')(props),
        boxShadow: 'none',
      },
    }),
    accent: (props: any) => ({
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
    }),
  },
  defaultProps: {
    size: 'sm',
  },
}

export default Button
