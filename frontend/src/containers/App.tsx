import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthProvider from '@auth/AuthContext'
import PrivateRoute from '@auth/PrivateRoute'
import SignIn from '@containers/SignIn'
import Home from './Home'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
