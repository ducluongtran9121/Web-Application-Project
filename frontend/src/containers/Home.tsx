import * as React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Box, Flex, Text } from '@chakra-ui/react'
import CardSkeleton from '../components/CardSkeleton'
import CourseItem from '../components/CourseItem'
import Footer from '../components/Footer'
import type { Course } from '../models'

function Home(): JSX.Element {
  const { getUserCourses } = useAuth()
  const [courses, setCourses] = React.useState<Course[]>()
  const [isLoading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    let isMounted = true

    async function getData() {
      setLoading(true)

      try {
        const data = await getUserCourses()
        if (isMounted) setCourses(data)
        // eslint-disable-next-line no-empty
      } catch {}

      if (isMounted) setLoading(false)
    }

    getData()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <Flex direction={{ base: 'column', md: 'row' }} mt="1.5rem">
      <Box flexShrink={0} px={{ base: '0.75rem', md: '1.5rem' }}>
        <Text fontWeight="bold">Deadlines</Text>
      </Box>
      <Box flexGrow={1} px={{ base: '0.75rem', md: '1.5rem' }}>
        <Text fontWeight="bold">All courses</Text>
        {isLoading ? (
          <CardSkeleton cardNumber="4" />
        ) : (
          courses && (
            <Flex direction="column" gridGap="0.5rem" mt="0.75rem" px="0.75rem">
              {courses.map((course) => (
                <CourseItem key={course.id} course={course} to={`courses/${course.id}`} />
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
