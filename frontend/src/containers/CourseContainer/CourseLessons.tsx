import * as React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useEdit } from '../../contexts/EditContext'
import { useParams } from 'react-router-dom'
import { I18nContext } from '../../i18n/i18n-react'
import { Flex, Text } from '@chakra-ui/react'
import CardSkeleton from '../../components/CardSkeleton'
import LessonItem from '../../components/LessonItem'
import type { Lesson } from '../../models'

function CourseLessons(): JSX.Element {
  const { user, getCourseLessons, editCourseLesson } = useAuth()
  const { isInEditingMode } = useEdit()
  const { LL } = React.useContext(I18nContext)
  const { courseId } = useParams()
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [lessons, setLessons] = React.useState<Lesson[]>()

  async function handleOnEditSubmit(lessonId: number, name: string, description: string) {
    try {
      await editCourseLesson(Number(courseId), lessonId, name, description)
      // eslint-disable-next-line no-empty
    } catch {}
  }

  React.useEffect(() => {
    async function getData() {
      setLoading(true)

      try {
        const data = await getCourseLessons(Number(courseId))
        setLessons(data)
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
          <LessonItem key={lesson.id} lesson={lesson} userRole={user?.role} isInEditingMode={isInEditingMode} onEditSubmit={handleOnEditSubmit} />
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
