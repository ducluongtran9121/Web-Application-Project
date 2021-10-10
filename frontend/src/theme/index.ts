import { extendTheme } from '@chakra-ui/react'

// styles
import colors from './colors'
import global from './global'

// components
import Button from './components/Button'
import Input from './components/Input'
import Link from './components/Link'

const theme = {
  shadows: {
    outline: '0 0 0px 2.5px #006dcccc',
  },
  styles: {
    global,
  },
  colors,
  components: {
    Button,
    Input,
    Link,
  },
}

export default extendTheme(theme)
