import { alertAnatomy as parts } from '@chakra-ui/anatomy'
import { mode } from '@chakra-ui/theme-tools'
import { PartsStyleFunction } from '@chakra-ui/theme-tools'

const variantSubtle: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props

  let bgContainer, colorIcon
  switch (c) {
    case 'orange':
      bgContainer = mode(
        'light.status.cautionBase',
        'dark.status.cautionBase',
      )(props)
      colorIcon = mode('light.status.caution', 'dark.status.caution')(props)
      break
    case 'green':
      bgContainer = mode(
        'light.status.successBase',
        'dark.status.successBase',
      )(props)
      colorIcon = mode('light.status.success', 'dark.status.success')(props)
      break
    case 'red':
      bgContainer = mode(
        'light.status.criticalBase',
        'dark.status.criticalBase',
      )(props)
      colorIcon = mode('light.status.critical', 'dark.status.critical')(props)
      break
    case 'blue':
    default:
      bgContainer = mode(
        'light.status.attentionBase',
        'dark.status.attentionBase',
      )(props)
      colorIcon = mode('light.status.attention', 'dark.status.attention')(props)
      break
  }

  return {
    container: {
      bg: bgContainer,
      border: '1px',
      borderStyle: 'solid',
      borderColor: mode('light.border.card', 'dark.border.card')(props),
      borderRadius: '4px',
    },
    icon: { color: colorIcon },
  }
}

const Alert = {
  parts: parts.keys,
  baseStyle: {},
  variants: {
    subtle: variantSubtle,
  },
}

export default Alert
