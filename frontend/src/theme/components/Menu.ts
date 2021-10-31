import { menuAnatomy as parts } from '@chakra-ui/anatomy'
import {
  mode,
  PartsStyleFunction,
  SystemStyleFunction,
} from '@chakra-ui/theme-tools'

const baseStyleItem: SystemStyleFunction = (props) => {
  return {
    py: '0.4rem',
    px: '0.8rem',
    transitionProperty: 'background',
    transitionDuration: 'ultra-fast',
    transitionTimingFunction: 'ease-in',
    bg: mode('light.subtle.default', 'dark.subtle.default')(props),
    _focus: {
      bg: mode('light.subtle.secondary', 'dark.subtle.secondary')(props),
    },
    _active: {
      bg: mode('light.subtle.ternary', 'dark.subtle.ternary')(props),
    },
    _expanded: {
      bg: mode('gray.100', 'whiteAlpha.100')(props),
    },
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
  }
}

const baseStyleList: SystemStyleFunction = (props) => {
  return {
    bg: mode('light.control.default', 'dark.control.default')(props),
    color: 'inherit',
    borderWidth: '1px',
    borderRadius: '4px',
    borderColor: mode('light.border.default', 'dark.border.default')(props),
    boxShadow: mode('sm', 'dark-lg')(props),
    minW: '3xs',
    py: '2',
    zIndex: 1,
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  list: baseStyleList(props),
  item: baseStyleItem(props),
})

const Menu = {
  baseStyle,
}

export default Menu
