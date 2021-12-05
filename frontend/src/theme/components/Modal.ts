import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { mode } from '@chakra-ui/theme-tools'
import type { StyleFunctionProps, SystemStyleFunction, PartsStyleFunction } from '@chakra-ui/theme-tools'

const baseStyleDialog: SystemStyleFunction = (props: StyleFunctionProps) => {
  const { scrollBehavior } = props

  return {
    borderRadius: 'md',
    bg: mode('light.popup.default', 'dark.popup.default')(props),
    borderColor: mode('light.border.control', 'dark.border.control')(props),
    color: 'inherit',
    my: '3.75rem',
    zIndex: 'modal',
    maxH: scrollBehavior === 'inside' ? 'calc(100% - 7.5rem)' : undefined,
    boxShadow: mode('lg', 'dark-lg')(props)
  }
}

const baseStyle: PartsStyleFunction<typeof parts> = (props: StyleFunctionProps) => ({
  dialog: baseStyleDialog(props)
})

const Modal = {
  parts: parts.keys,
  baseStyle
}

export default Modal
