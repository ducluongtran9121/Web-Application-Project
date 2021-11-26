import { mode } from '@chakra-ui/theme-tools'
import type { SystemStyleObject, SystemStyleFunction, StyleFunctionProps } from '@chakra-ui/theme-tools'

const baseStyle: SystemStyleObject = {
  border: '1px solid'
}

const variantSolid: SystemStyleFunction = (props: StyleFunctionProps) => ({
  bg: mode('light.control.default', 'dark.control.default')(props),
  borderColor: mode('light.border.control', 'dark.border.control')(props),
  shadow: 'sm',

  _hover: {
    bg: mode('light.control.secondary', 'dark.control.secondary')(props)
  },

  _active: {
    bg: mode('light.control.ternary', 'dark.control.ternary')(props)
  },

  _disabled: {
    bg: mode('light.control.disabled', 'dark.control.disabled')(props)
  }
})

const variantAccent: SystemStyleFunction = (props: StyleFunctionProps) => ({
  bg: mode('light.accent.default', 'dark.accent.default')(props),
  color: mode('light.text.inverse', 'dark.text.inverse')(props),
  borderColor: mode('light.border.control', 'dark.border.control')(props),
  shadow: 'sm',

  _hover: {
    bg: mode('light.accent.secondary', 'dark.accent.secondary')(props),

    _disabled: {
      bg: mode('light.accent.disabled', 'dark.accent.disabled')(props)
    }
  },

  _active: {
    bg: mode('light.accent.ternary', 'dark.accent.ternary')(props)
  },

  _disabled: {
    bg: mode('light.accent.disabled', 'dark.accent.disabled')(props)
  }
})

const variantCriticalOutLine: SystemStyleFunction = (props: StyleFunctionProps) => ({
  bg: mode('light.status.criticalBase', 'dark.status.criticalBase')(props),
  color: mode('light.status.critical', 'dark.status.critical')(props),
  borderColor: mode('light.status.critical', 'dark.status.critical')(props),
  shadow: 'sm'
})

const Button = {
  baseStyle,
  variants: {
    solid: variantSolid,
    accent: variantAccent,
    criticalOutLine: variantCriticalOutLine
  }
}

export default Button
