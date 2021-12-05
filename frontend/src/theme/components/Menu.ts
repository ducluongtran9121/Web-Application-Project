import { menuAnatomy as parts } from '@chakra-ui/anatomy'
import { mode } from '@chakra-ui/theme-tools'
import type { PartsStyleFunction, SystemStyleFunction, StyleFunctionProps } from '@chakra-ui/theme-tools'

const baseStyleList: SystemStyleFunction = (props: StyleFunctionProps) => {
  return {
    bg: mode('light.popup.default', 'dark.popup.default')(props),
    borderColor: mode('light.border.control', 'dark.border.control')(props),
    color: 'inherit',
    minW: '8rem',
    py: '2',
    zIndex: 2,
    borderRadius: 'md',
    borderWidth: '1px'
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props: StyleFunctionProps) => ({
  list: baseStyleList(props)
})

const Menu = {
  parts: parts.keys,
  baseStyle
}

export default Menu
