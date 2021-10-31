import { extendTheme } from '@chakra-ui/react'

// styles
import colors from './colors'
import Alert from './components/Alert'
// components
import Button from './components/Button'
import Container from './components/Container'
import Input from './components/Input'
import Link from './components/Link'
import Menu from './components/Menu'
import Spinner from './components/Spinner'
import global from './global'

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
    Menu,
    Alert,
    Container,
    Spinner,
  },
}

export default extendTheme(theme)
