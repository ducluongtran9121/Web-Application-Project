import * as React from 'react'
import { Avatar, Flex, Link, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import Card from './Card'
import type { To } from 'react-router-dom'
import type { Course } from '../models'

interface CourseItemProps {
  course: Course
  to: To
  state?: object
}

function CourseItem({ course: { name, code, lecturers }, to, state }: CourseItemProps): JSX.Element {
  return (
    <Card variant="hoverable">
      <Link variant="text" as={RouterLink} to={to} state={state} fontSize="1.5rem" fontWeight="semibold">
        {name} - {code}
      </Link>
      <Flex direction="column" mt="0.75rem" px="1rem" alignItems="start" gridGap="0.75rem">
        {lecturers.map(({ id, name, imageUrl }) => (
          <Link key={id} display="flex" gridGap="0.5rem" alignItems="center">
            <Avatar size="xs" name={name} src={imageUrl} />
            <Text>{name}</Text>
          </Link>
        ))}
      </Flex>
    </Card>
  )
}

export default CourseItem
