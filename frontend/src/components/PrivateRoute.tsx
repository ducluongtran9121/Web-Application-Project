import { Redirect, Route, RouteProps } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

function PrivateRoute({ ...rest }: RouteProps): JSX.Element {
  const { accessToken } = useAuth()

  if (accessToken) return <Route {...rest} />
  return <Redirect to="/signin" />
}

export default PrivateRoute
