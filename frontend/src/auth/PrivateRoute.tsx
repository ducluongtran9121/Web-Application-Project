import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useAuth } from './AuthContext'

interface Props extends RouteProps {}

function PrivateRoute({ ...rest }: Props) {
  const auth = useAuth()

  if (auth?.user !== null) return <Route {...rest}></Route>

  return <Redirect to="/signin" />
}

export default PrivateRoute
