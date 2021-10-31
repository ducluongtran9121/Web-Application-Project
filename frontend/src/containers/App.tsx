import { Route, Switch } from 'react-router-dom'

import PrivateRoute from '../components/PrivateRoute'
import PrivateRouteContainer from './PrivateRouteContainer'
import SignIn from './SignIn'

function App(): JSX.Element {
  return (
    <Switch>
      <Route path="/signin">
        <Switch>
          <Route path="/signin" component={SignIn} />
        </Switch>
      </Route>
      <PrivateRoute
        exact
        path={[
          '/',
          '/courses/:courseId',
          '/courses/:courseId/students',
          '/users/:userId',
          '/users/:userId/courses',
          '/users/:userId/deadlines',
        ]}
        component={PrivateRouteContainer}
      ></PrivateRoute>
    </Switch>
  )
}

export default App
