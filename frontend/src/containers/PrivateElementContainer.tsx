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
import type { Course, Deadline, Lesson } from '../models'
import { addCourseAndLessonNameToDeadline, addCourseNameToLesson } from '../helpers'

function PrivateElementContainer(): JSX.Element {
  const { user, signOut, getUserProfile, getUserCourses, getCourseLessons } = useAuth()
  const { notify } = useNotification()
  const { locale } = React.useContext(I18nContext)
  const [isMounted, setMounted] = React.useState<boolean>(false)
  const [isCoursesLoading, setCoursesLoading] = React.useState<boolean>(false)
  const [courses, setCourses] = React.useState<Course[]>([])
  const [isGetCoursesFailed, setGetCoursesFailed] = React.useState<boolean>(true)
  const [isLessonsLoading, setLessonsLoading] = React.useState<boolean>(false)
  const [lessons, setLessons] = React.useState<Lesson[]>([])
  const [currentLessonGetIndex, setCurrentLessonGetIndex] = React.useState<number>(0)
  const [deadlines, setDeadlines] = React.useState<Deadline[]>([])
  const [isCoursesSpinnerLoading, setCoursesSpinnerLoading] = React.useState<boolean>(true)
  const [isLessonsSpinnerLoading, setLessonsSpinnerLoading] = React.useState<boolean>(true)
  const [isDeadlinesSpinnerLoading, setDeadlinesSpinnerLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    setMounted(true)

    async function getUserData() {
      await getUserProfile()
    }

    getUserData()

    return () => {
      setMounted(false)
    }
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

  async function handleGetCourses(): Promise<Course[]> {
    if (isMounted) {
      setCoursesLoading(true)
      setCoursesSpinnerLoading(true)
    }
    let coursesData: Course[] = []
    if (!isCoursesLoading) {
      if (isGetCoursesFailed) {
        try {
          coursesData = await getUserCourses()
          if (isMounted) {
            setCourses(coursesData)
            setGetCoursesFailed(false)
          }
          // eslint-disable-next-line no-empty
        } catch {}
      }
    }
    if (isMounted) {
      setCoursesLoading(false)
      setCoursesSpinnerLoading(false)
    }
    return coursesData
  }

  async function handleSearchBoxFocus(): Promise<void> {
    await handleGetCourses()
  }

  async function handleSearchBoxChange(): Promise<void> {
    if (isCoursesLoading) return

    let tempCourses = courses
    if (isGetCoursesFailed) {
      const coursesData = await handleGetCourses()
      if (!coursesData) return
      tempCourses = coursesData
    }

    if (tempCourses.length === 0 || isLessonsLoading) return
    if (isMounted) {
      setLessonsLoading(true)
      setLessonsSpinnerLoading(true)
      setDeadlinesSpinnerLoading(true)
    }
    for (let i = currentLessonGetIndex; i < tempCourses.length; i++) {
      try {
        let lessonsData = await getCourseLessons(tempCourses[i].id)
        lessonsData = addCourseNameToLesson(lessonsData, tempCourses[i].name)
        let tempDeadlines: Deadline[] = []
        for (let j = 0; j < lessonsData.length; j++) {
          tempDeadlines = tempDeadlines.concat(addCourseAndLessonNameToDeadline(lessonsData[j].deadlines, tempCourses[i].name, lessonsData[j].name))
        }
        if (isMounted) {
          setLessons((previousValue) => previousValue.concat(lessonsData))
          setDeadlines((previousValue) => previousValue.concat(tempDeadlines))
        }
      } catch {
        if (isMounted) setCurrentLessonGetIndex(i)
        break
      }
    }

    if (isMounted) {
      setCurrentLessonGetIndex(tempCourses.length)
      setLessonsLoading(false)
      setLessonsSpinnerLoading(false)
      setDeadlinesSpinnerLoading(false)
    }
  }

  async function handleSearchBoxBlur(): Promise<void> {
    if (isMounted) {
      setCourses([])
      setLessons([])
      setDeadlines([])
      setGetCoursesFailed(true)
      setCurrentLessonGetIndex(0)
      setCoursesSpinnerLoading(true)
      setLessonsSpinnerLoading(true)
      setDeadlinesSpinnerLoading(true)
    }
  }

  return (
    <Box>
      {user && (
        <NavBar
          user={user}
          signOut={signOut}
          courses={courses}
          lessons={lessons}
          deadlines={deadlines}
          isCoursesSpinnerLoading={isCoursesSpinnerLoading}
          isLessonsSpinnerLoading={isLessonsSpinnerLoading}
          isDeadlinesSpinnerLoading={isDeadlinesSpinnerLoading}
          onSearchBoxFocus={handleSearchBoxFocus}
          onSearchBoxChange={handleSearchBoxChange}
          onSearchBoxBlur={handleSearchBoxBlur}
        />
      )}
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
          {user?.role === 'student' && <Route path="deadlines" element={<UserDeadlines />} />}
        </Route>
      </Routes>
    </Box>
  )
}

export default PrivateElementContainer
