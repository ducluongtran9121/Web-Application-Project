import { mode } from '@chakra-ui/theme-tools'
import type { SystemStyleFunction, StyleFunctionProps } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleFunction = (props: StyleFunctionProps) => ({
  textAlign: 'center',
  color: mode('light.accent.default', 'dark.accent.default')(props),
  borderRadius: 'md',

  _hover: {
    color: mode('light.accent.darker', 'dark.accent.darker')(props)
  },

  _active: {
    color: mode('light.accent.secondary', 'dark.accent.secondary')(props)
  }
})

const variantText: SystemStyleFunction = (props: StyleFunctionProps) => ({
  color: mode('light.text.default', 'dark.text.default')(props),

  _hover: {
    color: mode('light.text.default', 'dark.text.default')(props)
  },

  _active: {
    color: mode('light.text.secondary', 'dark.text.secondary')(props)
  }
})

const variantMenu: SystemStyleFunction = (props: StyleFunctionProps) => ({
  color: mode('light.text.default', 'dark.text.default')(props),

  _hover: {
    color: mode('light.text.lighter', 'dark.text.lighter')(props),
    textDecoration: 'none'
  },

  _active: {
    color: mode('light.text.lighter', 'dark.text.lighter')(props)
  }
})

const variantTab: SystemStyleFunction = (props: StyleFunctionProps) => ({
  color: mode('light.text.default', 'dark.text.default')(props),

  _hover: {
    color: mode('light.text.default', 'dark.text.default')(props),
    textDecoration: 'none'
  },

  _active: {
    color: mode('light.text.default', 'dark.text.default')(props)
  }
})

const Link = {
  baseStyle,
  variants: {
    text: variantText,
    tab: variantTab,
    menu: variantMenu
  }
}

export default Link
