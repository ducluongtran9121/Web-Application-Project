import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Box } from '@chakra-ui/react'

import NavBar from '../components/NavBar'
import { useAuth } from '../contexts/AuthContext'
import CourseContainer from './CourseContainer'
import Home from './HomeContainer'
import UserContainer from './UserContainer'

function PrivateRouteContainer() {
  const { user, checkTokenExpired, getCurrentUserProfile } = useAuth()

  React.useEffect(
    () => {
      async function checkToken() {
        await checkTokenExpired()
      }

      async function fetchUser() {
        await getCurrentUserProfile()
      }
      checkToken()
      fetchUser()
    }, // eslint-disable-next-line
    [],
  )
  return (
    <Box>
      {user && <NavBar user={user} />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/courses/:courseId" component={CourseContainer} />
        <Route path="/users/:userId" component={UserContainer} />
      </Switch>
    </Box>
  )
}

export default PrivateRouteContainer
