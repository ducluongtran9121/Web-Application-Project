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

const variantSearch: SystemStyleFunction = (props: StyleFunctionProps) => ({
  color: mode('light.accent.default', 'dark.accent.default')(props),
  p: '0.5rem',
  textAlign: 'left',

  _hover: {
    bg: mode('light.hoverable.secondary', 'dark.hoverable.secondary')(props),
    color: mode('light.accent.darker', 'dark.accent.darker')(props),
    textDecoration: 'none'
  },

  _active: {
    bg: mode('light.hoverable.ternary', 'dark.hoverable.ternary')(props),
    color: mode('light.accent.secondary', 'dark.accent.secondary')(props)
  }
})

const Link = {
  baseStyle,
  variants: {
    text: variantText,
    tab: variantTab,
    menu: variantMenu,
    search: variantSearch
  }
}

export default Link
