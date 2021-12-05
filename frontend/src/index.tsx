import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ColorModeScript } from '@chakra-ui/react'
import 'focus-visible'
import theme from './theme'
import App from './containers/App'

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)