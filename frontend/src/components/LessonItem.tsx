import * as React from 'react'
import { Flex, Text } from '@chakra-ui/react'

import Card from './Card'
import LocationTreeView from './LocationTreeView'

import type { CardProps } from './Card'
import type { Lesson } from '../models'

interface LessonItemProps extends CardProps {
  lesson: Lesson
}

function LessonItem({ lesson: { name, description, items }, ...rest }: LessonItemProps): JSX.Element {
  return (
    <Card {...rest}>
      <Flex direction="column" gridGap="0.25rem">
        <Text fontWeight="semibold" fontSize="1.5rem">
          {name}
        </Text>
        <Text>{description}</Text>
        {items && <LocationTreeView pt="0.5rem" items={items} />}
      </Flex>
    </Card>
  )
}

export default LessonItem
