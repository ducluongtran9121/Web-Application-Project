import { mode } from '@chakra-ui/theme-tools'

const Input = {
  baseStyles: {},
  sizes: {
    sm: {
      field: {
        borderRadius: '4px',
      },
    },
  },
  variants: {
    outline: (props: any) => ({
      field: {
        bg: mode('light.control.default', 'dark.control.default')(props),
        border: '1px solid',
        borderColor: mode('light.border.default', 'dark.border.default')(props),
        boxShadow: 'sm',

        _hover: {
          bg: mode('light.control.secondary', 'dark.control.secondary')(props),
          borderColor: mode(
            'light.border.default',
            'dark.border.default'
          )(props),
        },
      },
    }),
  },
  defaultProps: {
    size: 'sm',
  },
}

export default Input
