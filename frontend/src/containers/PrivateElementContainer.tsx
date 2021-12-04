import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useNotification } from '../contexts/NotificationContext'
import { I18nContext } from '../i18n/i18n-react'
import EditProvider from '../contexts/EditContext'
import { Box } from '@chakra-ui/react'
import NavBar from '../components/NavBar'
import Home from './Home'
import CourseContainer from './CourseContainer/CourseContainer'
import CourseLessons from './CourseContainer/CourseLessons'
import CourseStudents from './CourseContainer/CourseStudent'
import CourseDeadlineStudent from './CourseContainer/CourseDeadlineStudent'
import CourseDeadlineLecturer from './CourseContainer/CourseDeadlineLecturer'
import UserContainer from './UserContainer/UserContainer'
import UserOverview from './UserContainer/UserOverview'
import UserCourses from './UserContainer/UserCourses'
import UserDeadlines from './UserContainer/UserDeadlines'

function PrivateElementContainer(): JSX.Element {
  const { user, signOut, getUserProfile } = useAuth()
  const { notify } = useNotification()
  const { locale } = React.useContext(I18nContext)

  React.useEffect(() => {
    async function getUserData() {
      await getUserProfile()
    }

    getUserData()
  }, [])

  React.useEffect(() => {
    const handleNetworkOffline = () => notify('error', 'networkOffline', 30000)

    window.addEventListener('offline', handleNetworkOffline)

    return () => window.removeEventListener('offline', handleNetworkOffline)
  }, [locale])

  React.useEffect(() => {
    const handleNetworkOnline = () => notify('info', 'networkOnline', 30000)

    window.addEventListener('online', handleNetworkOnline)

    return () => window.removeEventListener('online', handleNetworkOnline)
  }, [locale])

  return (
    <Box>
      {user && <NavBar user={user} signOut={signOut} />}
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
          {user?.role === 'lecturer' && <Route path="lessons/:lessonId/deadlines/:deadlineId" element={<CourseDeadlineLecturer />} />}
          {user?.role === 'student' && <Route path="lessons/:lessonId/submitdeadline/:submitId" element={<CourseDeadlineStudent />} />}
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
