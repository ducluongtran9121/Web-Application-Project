import { mode } from '@chakra-ui/theme-tools'

const global = (props: any) => ({
  'html, body': {
    bg: mode('light.base.default', 'dark.base.default')(props),
    color: mode('light.text.default', 'dark.text.default')(props),
  },
})

export default global
