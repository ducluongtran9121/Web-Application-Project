import { mode } from '@chakra-ui/theme-tools'

const global = (props: any) => ({
  'html, body': {
    bg: mode('light.base.default', 'dark.base.default')(props),
    color: mode('light.text.default', 'dark.text.default')(props),
  },
  h1: {
    p: 0,
  },
  '::-webkit-scrollbar': {
    w: '1rem',
  },
  '::-webkit-scrollbar-track': {
    bg: 'transparent',
  },
  '::-webkit-scrollbar-thumb': {
    bg: mode('light.scrollBar.default', 'dark.scrollBar.default')(props),
    borderWidth: '0.25rem',
    borderStyle: 'solid',
    borderColor: mode('light.base.default', 'dark.base.default')(props),
    borderRadius: '8px',
  },
  '::-webkit-scrollbar-thumb:hover': {
    bg: mode('light.scrollBar.secondary', 'dark.scrollBar.secondary')(props),
  },
  '::-webkit-scrollbar-thumb:active': {
    bg: mode('light.scrollBar.ternary', 'dark.scrollBar.ternary')(props),
  },
})

export default global
