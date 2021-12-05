import { mode } from '@chakra-ui/theme-tools'
import type { SystemStyleFunction, StyleFunctionProps } from '@chakra-ui/theme-tools'

const global: SystemStyleFunction = (props: StyleFunctionProps) => ({
  'html, body': {
    bg: mode('light.base.default', 'dark.base.default')(props),
    color: mode('light.text.default', 'dark.text.default')(props)
  },
  '::-webkit-scrollbar': {
    w: '1rem'
  },
  '::-webkit-scrollbar-track': {
    bg: 'transparent'
  },
  '::-webkit-scrollbar-thumb': {
    bg: mode('light.scrollBar.default', 'dark.scrollBar.default')(props),
    borderWidth: '0.25rem',
    borderStyle: 'solid',
    borderColor: mode('light.base.default', 'dark.base.default')(props),
    borderRadius: '8px'
  },
  '::-webkit-scrollbar-thumb:hover': {
    bg: mode('light.scrollBar.secondary', 'dark.scrollBar.secondary')(props)
  },
  '::-webkit-scrollbar-thumb:active': {
    bg: mode('light.scrollBar.ternary', 'dark.scrollBar.ternary')(props)
  },
  '::-webkit-file-upload-button': {
    bg: mode('light.control.default', 'dark.control.default')(props),
    color: mode('light.text.default', 'dark.text.default')(props),
    border: '1px solid',
    borderColor: mode('light.border.control', 'dark.border.control')(props),
    borderRadius: '6px',
    h: 10,
    minW: 10,
    fontSize: 'md',
    px: 4,
    fontWeight: 'semibold',
    shadow: 'sm'
  },
  '::-webkit-file-upload-button:hover': {
    bg: mode('light.control.secondary', 'dark.control.secondary')(props)
  },
  '::-webkit-file-upload-button:active': {
    bg: mode('light.control.ternary', 'dark.control.ternary')(props)
  }
})

const styles = {
  global
}

export default styles
