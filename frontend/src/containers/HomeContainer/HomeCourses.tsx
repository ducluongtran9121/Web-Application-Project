import * as React from 'react'

import { Flex } from '@chakra-ui/react'

import { Course } from '../../models'

import CardSkeleton from '../../components/CardSkeleton'
import CourseItem from '../../components/CourseItem'
import { useAuth } from '../../contexts/AuthContext'

function HomeCourses(): JSX.Element {
  const { getCurrentUserCourses } = useAuth()
  const [courses, setCourses] = React.useState<Course[]>()
  const [isLoading, setLoading] = React.useState<boolean>(true)

  React.useEffect(
    () => {
      async function getData() {
        setLoading(true)
        try {
          const cs = await getCurrentUserCourses()
          setCourses(cs)
        } catch (err) {}
        setLoading(false)
      }
      getData()
    }, // eslint-disable-next-line
    [],
  )

  if (isLoading) {
    return <CardSkeleton cardNumber="4" />
  }

  if (courses) {
    return (
      <Flex
        direction="column"
        gridGap="0.5rem"
        my="1.5rem"
        px={{ base: '1rem', md: '2rem' }}
      >
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </Flex>
    )
  }

  return <>hihi</>
}

export default HomeCourses
