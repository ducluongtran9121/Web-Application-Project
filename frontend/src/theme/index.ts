import { extendTheme } from '@chakra-ui/react'

import config from './config'
import colors from './colors'
import shadows from './shadows'
import styles from './styles'

// components
import Button from './components/Button'
import Card from './components/Card'
import Input from './components/Input'
import Link from './components/Link'
import Alert from './components/Alert'
import Tabs from './components/Tabs'
import Menu from './components/Menu'
import Tooltip from './components/Tooltip'

const theme = extendTheme({
  config,
  colors,
  shadows,
  styles,
  components: {
    Alert,
    Button,
    Card,
    Input,
    Link,
    Menu,
    Tabs,
    Tooltip
  }
})

export default theme
