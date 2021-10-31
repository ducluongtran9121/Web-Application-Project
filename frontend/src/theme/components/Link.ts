import { mode, SystemStyleFunction } from '@chakra-ui/theme-tools'

const variantText: SystemStyleFunction = (props) => ({
  color: mode('light.text.default', 'dark.text.default')(props),

  _hover: {
    color: mode('light.text.default', 'dark.text.default')(props),
  },

  _active: {
    color: mode('light.text.lighter', 'dark.text.lighter')(props),
  },
})

const variantMenu: SystemStyleFunction = (props) => ({
  color: mode('light.text.default', 'dark.text.default')(props),

  _hover: {
    color: mode('light.text.lighter', 'dark.text.lighter')(props),
    textDecoration: 'none',
  },

  _active: {
    color: mode('light.text.lighter', 'dark.text.lighter')(props),
  },
})

const Link = {
  baseStyle: (props: any) => ({
    textAlign: 'center',
    color: mode('light.accent.default', 'dark.accent.default')(props),

    _hover: {
      color: mode('light.accent.darker', 'dark.accent.darker')(props),
    },

    _active: {
      color: mode('light.accent.secondary', 'dark.accent.secondary')(props),
    },
  }),

  variants: {
    text: variantText,
    menu: variantMenu,
  },
}

export default Link
