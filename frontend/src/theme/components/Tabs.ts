import { tabsAnatomy as parts } from '@chakra-ui/anatomy'
import { mode } from '@chakra-ui/theme-tools'
import type { PartsStyleFunction, SystemStyleFunction, StyleFunctionProps } from '@chakra-ui/theme-tools'

const baseStyleTab: SystemStyleFunction = (props: StyleFunctionProps) => {
  const { isFitted } = props

  return {
    flex: isFitted ? 1 : undefined,
    transitionProperty: 'common',
    transitionDuration: 'normal',
    border: '1px solid',
    borderColor: 'transparent',
    _focus: {
      zIndex: 1,
      boxShadow: 'outline'
    }
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  tab: baseStyleTab(props)
})

const variantSolid: PartsStyleFunction<typeof parts> = (props: StyleFunctionProps) => ({
  tab: {
    borderRadius: '6px',
    fontWeight: 'semibold',
    color: mode('light.text.default', 'dark.text.default')(props),

    _hover: {
      borderColor: mode('light.border.control', 'dark.border.control')(props)
    },

    _selected: {
      bg: mode('light.accent.default', 'dark.accent.default')(props),
      color: mode('light.text.inverse', 'dark.text.inverse')(props),

      _hover: {
        bg: mode('light.accent.secondary', 'dark.accent.secondary')(props),

        _disabled: {
          bg: mode('light.accent.disabled', 'dark.accent.disabled')(props)
        }
      },

      _active: {
        bg: mode('light.accent.ternary', 'dark.accent.ternary')(props)
      }
    }
  }
})

export default {
  parts: parts.keys,
  baseStyle,
  variants: {
    solid: variantSolid
  }
}
