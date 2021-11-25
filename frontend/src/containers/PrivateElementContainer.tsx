import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { I18nContext } from '../i18n/i18n-react'
import EditProvider from '../contexts/EditContext'
import { Box, useToast } from '@chakra-ui/react'
import NavBar from '../components/NavBar'
import Home from './Home'
import CourseContainer from './CourseContainer/CourseContainer'
import CourseLessons from './CourseContainer/CourseLessons'
import CourseStudents from './CourseContainer/CourseStudent'
import UserContainer from './UserContainer/UserContainer'
import UserOverview from './UserContainer/UserOverview'
import UserCourses from './UserContainer/UserCourses'
import UserDeadlines from './UserContainer/UserDeadlines'

function PrivateElementContainer(): JSX.Element {
  const { user, getUserProfile } = useAuth()
  const { LL, locale } = React.useContext(I18nContext)
  const toast = useToast()

  React.useEffect(() => {
    async function getUserData() {
      await getUserProfile()
    }

    getUserData()
  }, [])

  React.useEffect(() => {
    function handleNetWorkOffline() {
      return toast({
        title: LL.common.offline(),
        description: LL.common.offlineDescription(),
        status: 'error',
        variant: 'subtle',
        position: 'bottom-right',
        duration: 30000,
        isClosable: true
      })
    }

    window.addEventListener('offline', handleNetWorkOffline)

    return () => window.removeEventListener('offline', handleNetWorkOffline)
  }, [locale])

  React.useEffect(() => {
    function handleNetWorkOffline() {
      return toast({
        title: LL.common.online(),
        description: LL.common.onlineDescription(),
        status: 'info',
        duration: 30000,
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    }

    window.addEventListener('online', handleNetWorkOffline)

    return () => window.removeEventListener('online', handleNetWorkOffline)
  }, [locale])

  return (
    <Box>
      {user && <NavBar user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="courses/:courseId"
          element={
            <EditProvider>
              <CourseContainer />
            </EditProvider>
          }
        >
          <Route path="" element={<CourseLessons />} />
          <Route path="students" element={<CourseStudents />} />
        </Route>
        <Route path="users/:userId" element={<UserContainer />}>
          <Route path="" element={<UserOverview />} />
          <Route path="courses" element={<UserCourses />} />
          <Route path="deadlines" element={<UserDeadlines />} />
        </Route>
      </Routes>
    </Box>
  )
}

export default PrivateElementContainer
