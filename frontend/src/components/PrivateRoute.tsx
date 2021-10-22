import { Route, Redirect, RouteProps } from 'react-router-dom'

interface Props extends RouteProps {
  isAuthorized: boolean
}

function PrivateRoute({ isAuthorized, ...rest }: Props) {
  if (isAuthorized) return <Route {...rest} />
  return <Redirect to="/signin" />
}

export default PrivateRoute
