import { Text, Flex, Link } from '@chakra-ui/react'
import { Course } from '../models'
import Card from './Card'

interface Props {
  course: Course
}

function CourseItem({ course: { name, code, lecturers } }: Props) {
  return (
    <Card>
      <Flex direction="column" gridGap="1rem">
        <Link fontWeight="semibold" fontSize="3xl" variant="text">
          {code} - {name}
        </Link>
        <Flex direction="column" gridGap="0.5rem">
          {lecturers.map(({ id, name }) => {
            return (
              <Text key={id}>
                Lecturer: <Link>{name}</Link>
              </Text>
            )
          })}
        </Flex>
      </Flex>
    </Card>
  )
}

export default CourseItem
