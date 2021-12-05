/* eslint-disable react/no-unescaped-entities */
import * as React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { I18nContext } from '../../i18n/i18n-react'
import { Flex, Text } from '@chakra-ui/react'
import CardSkeleton from '../../components/CardSkeleton'
import CourseItem from '../../components/CourseItem'
import type { Course } from '../../models'

function UserCourses(): JSX.Element {
  const { getUserCourses } = useAuth()
  const { LL } = React.useContext(I18nContext)
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [courses, setCourses] = React.useState<Course[]>()

  React.useEffect(() => {
    async function getData(): Promise<void> {
      setLoading(true)

      try {
        const data = await getUserCourses()
        setCourses(data)
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
          <CourseItem key={course.id} course={course} to={`/courses/${course.id}`} />
        ))}
      </Flex>
    )
  }
  return (
    <Flex direction="column" alignItems="center">
      <Text fontSize="3rem">{`🐧 ${LL.user.noCourses()}`}</Text>
    </Flex>
  )
}

export default UserCourses
