import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AuthProvider from '../auth/AuthContext'
import PrivateRoute from '../auth/PrivateRoute'
import SignIn from './SignIn'
import Home from './Home'
import NotFound from './NotFound'
import About from './About'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/about" component={About} />
          <Route path="*" component={NotFound} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
