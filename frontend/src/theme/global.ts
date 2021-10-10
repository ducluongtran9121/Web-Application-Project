import { mode } from '@chakra-ui/theme-tools'

const global = (props: any) => ({
  'html, body': {
    bg: mode('light.base.default', 'dark.base.default')(props)
  },
})

export default global
