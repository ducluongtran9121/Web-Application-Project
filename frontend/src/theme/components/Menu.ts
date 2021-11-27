import { menuAnatomy as parts } from '@chakra-ui/anatomy'
import type { PartsStyleFunction, SystemStyleFunction, StyleFunctionProps } from '@chakra-ui/theme-tools'

const baseStyleList: SystemStyleFunction = () => {
  return {
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

export default {
  parts: parts.keys,
  baseStyle
}
