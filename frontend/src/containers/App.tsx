import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { useMachine } from '@xstate/react'
import { authMachine } from '../machines/authMachine'
import SignIn from './SignIn'
import Home from './Home'
import NotFound from './NotFound'
import PrivateRoute from '../components/PrivateRoute'
import About from './About'

function App() {
  const [authState, , authService] = useMachine(authMachine)
  const isAuthorized = authState.matches('authorized')

  return (
    <Router>
      <Switch>
        <PrivateRoute
          isAuthorized={isAuthorized}
          exact
          path="/"
          component={Home}
        />
        <Route path="/signin">
          <SignIn authService={authService} />
        </Route>
        <Route path="/about" component={About} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  )
}

export default App
