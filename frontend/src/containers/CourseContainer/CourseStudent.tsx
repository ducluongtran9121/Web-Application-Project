import * as React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useParams } from 'react-router-dom'
import { I18nContext } from '../../i18n/i18n-react'
import { Avatar, Flex, Link, Text } from '@chakra-ui/react'
import Card from '../../components/Card'
import CardSkeleton from '../../components/CardSkeleton'
import type { Student } from '../../models'

function CourseStudents(): JSX.Element {
  const { getCourseStudents } = useAuth()
  const { LL } = React.useContext(I18nContext)
  const { courseId } = useParams()
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [students, setStudents] = React.useState<Student[]>()

  React.useEffect(() => {
    async function getData(): Promise<void> {
      setLoading(true)

      try {
        const data = await getCourseStudents(Number(courseId))
        setStudents(data.filter((member) => member.role === 'student'))
        // eslint-disable-next-line no-empty
      } catch {}

      setLoading(false)
    }
    getData()
  }, [])

  if (isLoading) {
    return <CardSkeleton cardNumber="4" />
  } else if (students && students.length !== 0) {
    return (
      <Card>
        <Text fontWeight="semibold" fontSize="1.5rem">
          {LL.course.students()}:
        </Text>
        <Flex direction="column" gridGap="0.5rem" mt="0.75rem" pl="1rem" alignItems="stretch">
          {students.map(({ id, name, imageUrl }) => (
            <Link key={id} display="flex" gridGap="0.5rem" alignItems="center">
              <Avatar bg="transparent" size="xs" name={name} src={imageUrl} />
              <Text>{name}</Text>
            </Link>
          ))}
        </Flex>
      </Card>
    )
  }

  return (
    <Flex textAlign="center" direction="column" alignItems="center" gridGap="0.5rem">
      <Text fontSize="5rem">≡(▔﹏▔)≡</Text>
      <Text fontSize="2rem">{LL.course.noStudents()}</Text>
    </Flex>
  )
}

export default CourseStudents
