/* eslint-disable react/no-unescaped-entities */
import * as React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { useAuth } from '../../contexts/AuthContext'

import CardSkeleton from '../../components/CardSkeleton'
import CourseItem from '../../components/CourseItem'

import type { Course } from '../../models'

function UserCourses(): JSX.Element {
  const { getUserCourses } = useAuth()
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [courses, setCourses] = React.useState<Course[]>()

  React.useEffect(() => {
    async function getData() {
      setLoading(true)

      try {
        const cs = await getUserCourses()
        setCourses(cs)
        // eslint-disable-next-line no-empty
      } catch {}

      setLoading(false)
    }
    getData()
  }, [])

  if (isLoading) {
    return <CardSkeleton cardNumber="4" />
  }

  if (courses) {
    return (
      <Flex direction="column" gridGap="0.5rem">
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} to={''} />
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
