import { Link as RouteLink } from 'react-router-dom'

import { Avatar, Container, Flex, Link, Text } from '@chakra-ui/react'

import { Course } from '../models'

interface Props {
  course: Course
}

function CourseItem({
  course: { id, code, name, lecturers },
}: Props): JSX.Element {
  return (
    <Container variant="card">
      <Link
        as={RouteLink}
        variant="text"
        fontSize="1.75rem"
        fontWeight="semibold"
        to={`/courses/${id}`}
      >
        {code} - {name}
      </Link>
      <Flex
        direction="column"
        mt="0.75rem"
        px="1rem"
        alignItems="start"
        gridGap="0.75rem"
      >
        {lecturers.map(({ id, name, imageUrl }) => (
          <Link key={id} display="flex" gridGap="0.5rem" alignItems="center">
            <Avatar size="xs" name={name} src={imageUrl} />
            <Text>{name}</Text>
          </Link>
        ))}
      </Flex>
    </Container>
  )
}

export default CourseItem
