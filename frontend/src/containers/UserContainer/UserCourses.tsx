import * as React from 'react'

import { Flex, Text } from '@chakra-ui/react'

import { Course } from '../../models'

import CardSkeleton from '../../components/CardSkeleton'
import CourseItem from '../../components/CourseItem'
import { useAuth } from '../../contexts/AuthContext'

function UserCourses(): JSX.Element {
  const { getCurrentUserCourses } = useAuth()
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [courses, setCourses] = React.useState<Course[]>()

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
      <Flex direction="column" gridGap="0.5rem">
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} />
        ))}
      </Flex>
    )
  }

  return (
    <Flex direction="column" alignItems="center">
      <Text fontSize="3rem">🐧 You don't have any courses</Text>
    </Flex>
  )
}

export default UserCourses
