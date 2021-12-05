import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Box, Flex, Link, Spinner, Text, Tooltip } from '@chakra-ui/react'
import CardSkeleton from '../components/CardSkeleton'
import CourseItem from '../components/CourseItem'
import Footer from '../components/Footer'
import type { Course, Deadline } from '../models'
import { getLimitInTimeDeadline } from '../helpers'
import RemainTime from '../components/RemainTime'

function Home(): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const { user, getUserCourses, getStudentDeadlines } = useAuth()
  const [courses, setCourses] = React.useState<Course[]>()
  const [deadlines, setDeadlines] = React.useState<Deadline[]>()
  const [isLoading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    let isMounted = true

    async function getData() {
      setLoading(true)

      try {
        if (user?.role === 'lecturer') {
          const data = await getUserCourses()
          if (isMounted) setCourses(data)
        } else {
          const [coursesData, deadlinesData] = await Promise.all([getUserCourses(), getStudentDeadlines()])
          if (isMounted) {
            setCourses(coursesData)
            setDeadlines(getLimitInTimeDeadline(deadlinesData, 5))
          }
        }
        // eslint-disable-next-line no-empty
      } catch {}

      if (isMounted) setLoading(false)
    }

    getData()

    return () => {
      isMounted = false
    }
  }, [user])

  return (
    <Flex direction={{ base: 'column', md: 'row' }} mt="1.5rem" gridGap={{ base: '1.5rem', md: '0' }}>
      {user?.role === 'student' && (
        <Box flexShrink={0} px={{ base: '0.75rem', md: '1.5rem' }}>
          <Text fontWeight="bold">{LL.common.deadlines()}</Text>
          <Flex direction="column" gridGap="0.75rem" pl="0.5rem" mt="0.75rem">
            {isLoading ? (
              <Spinner />
            ) : (
              deadlines &&
              deadlines.map(({ id, name, begin, end, courseId, lessonId, submitId, courseCode, courseName, lessonName }) => (
                <Tooltip key={id} label={`${courseName} - ${courseCode} > ${lessonName}`}>
                  <Link
                    as={RouterLink}
                    to={`courses/${courseId}/lessons/${lessonId}/submitdeadline/${submitId}`}
                    display="flex"
                    alignItems="center"
                    gridGap="0.5rem"
                    textAlign="left"
                  >
                    <Text>{name}</Text>
                    <Text>-</Text>
                    <RemainTime begin={begin} end={end} />
                  </Link>
                </Tooltip>
              ))
            )}
          </Flex>
        </Box>
      )}
      <Box flexGrow={1} px={{ base: '0.75rem', md: '1.5rem' }}>
        <Text fontWeight="bold">{LL.common.allCourses()}</Text>
        {isLoading ? (
          <CardSkeleton cardNumber="4" />
        ) : (
          courses && (
            <Flex direction="column" gridGap="0.5rem" mt="0.75rem" px="0.75rem">
              {courses.map((course) => (
                <CourseItem key={course.id} course={course} to={`/courses/${course.id}`} />
              ))}
            </Flex>
          )
        )}
        <Footer mt="4rem" />
      </Box>
    </Flex>
  )
}

export default Home
