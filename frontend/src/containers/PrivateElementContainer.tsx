import * as React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Box } from '@chakra-ui/react'
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

  React.useEffect(() => {
    async function getUserData() {
      await getUserProfile()
    }

    getUserData()
  }, [])

  return (
    <Box>
      {user && <NavBar user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="courses/:courseId" element={<CourseContainer />}>
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
