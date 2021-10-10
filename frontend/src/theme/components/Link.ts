import { mode } from '@chakra-ui/theme-tools'

const Link = {
  baseStyle: (props: any) => ({
    color: mode('light.accent.default', 'dark.accent.default')(props),

    _hover: {
      color: mode('light.accent.darker', 'dark.accent.darker')(props),
    },

    _active: {
      color: mode('light.accent.secondary', 'dark.accent.secondary')(props),
    },
  }),
}

export default Link
