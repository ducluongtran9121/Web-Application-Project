import * as React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useParams } from 'react-router-dom'
import { I18nContext } from '../../i18n/i18n-react'
import { Flex, Text } from '@chakra-ui/react'

import CardSkeleton from '../../components/CardSkeleton'

import type { Lesson } from '../../models'
import LessonItem from '../../components/LessonItem'

function CourseLessons(): JSX.Element {
  const { getCourseLessons } = useAuth()
  const { courseId } = useParams()
  const { LL } = React.useContext(I18nContext)
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [lessons, setLessons] = React.useState<Lesson[]>()

  React.useEffect(() => {
    async function getData() {
      setLoading(true)

      try {
        const ls = await getCourseLessons(Number(courseId))
        setLessons(ls)
        // eslint-disable-next-line no-empty
      } catch {}

      setLoading(false)
    }
    getData()
  }, [])

  if (isLoading) {
    return <CardSkeleton cardNumber="4" />
  }

  if (lessons) {
    return (
      <Flex direction="column" gridGap="0.5rem">
        {lessons.map((lesson) => (
          <LessonItem key={lesson.id} lesson={lesson} />
        ))}
      </Flex>
    )
  }

  return (
    <Flex direction="column" alignItems="center" gridGap="0.5rem">
      <Text textAlign="center" fontSize="5rem">
        ≡(▔﹏▔)≡
      </Text>
      <Text textAlign="center" fontSize="2rem">
        {LL.courses.noLessons()}
      </Text>
    </Flex>
  )
}

export default CourseLessons
