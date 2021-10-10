import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthProvider from '@auth/AuthContext'
import PrivateRoute from '@auth/PrivateRoute'
import Login from '@containers/Login'
import Home from './Home'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/signin" component={Login} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
