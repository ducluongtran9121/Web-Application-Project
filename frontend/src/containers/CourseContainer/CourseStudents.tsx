import * as React from 'react'

import { Avatar, Container, Flex, Link, Text } from '@chakra-ui/react'

import { Student } from '../../models'

import CardSkeleton from '../../components/CardSkeleton'
import { useAuth } from '../../contexts/AuthContext'

interface Props {
  courseId: number
}

function CourseStudents({ courseId }: Props): JSX.Element {
  const { getCourseStudents } = useAuth()
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [students, setStudents] = React.useState<Student[]>()

  React.useEffect(
    () => {
      async function getData() {
        setLoading(true)
        try {
          const stds = await getCourseStudents(courseId)
          setStudents(stds)
        } catch (err) {}
        setLoading(false)
      }
      getData()
    }, // eslint-disable-next-line
    [],
  )

  if (isLoading) {
    return <CardSkeleton cardNumber="4" />
  } else if (students) {
    return (
      <Container variant="card">
        <Text fontWeight="semibold" fontSize="1.5rem">
          Students:
        </Text>
        <Flex
          direction="column"
          gridGap="0.5rem"
          mt="0.75rem"
          pl="1rem"
          alignItems="stretch"
        >
          {students.map(({ id, name, imageUrl }) => (
            <Link key={id} display="flex" gridGap="0.5rem" alignItems="center">
              <Avatar size="xs" name={name} src={imageUrl} />
              <Text>{name}</Text>
            </Link>
          ))}
        </Flex>
      </Container>
    )
  }

  return (
    <Flex direction="column" alignItems="center" gridGap="0.5rem">
      <Text fontSize="5rem">≡(▔﹏▔)≡</Text>
      <Text fontSize="2rem">This course doesn't have any students</Text>
    </Flex>
  )
}

export default CourseStudents
