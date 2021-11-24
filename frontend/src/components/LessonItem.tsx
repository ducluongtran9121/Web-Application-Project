import * as React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import Card from './Card'
import DeadlineItem from './DeadlineItem'
import LocationTreeView from './LocationTreeView'
import type { CardProps } from './Card'
import type { Lesson } from '../models'

interface LessonItemProps extends CardProps {
  lesson: Lesson
}

function LessonItem({ lesson: { name, description, locationItems, deadlines }, ...rest }: LessonItemProps): JSX.Element {
  return (
    <Card {...rest}>
      <Flex direction="column" gridGap="0.25rem">
        <Text fontWeight="semibold" fontSize="1.5rem">
          {name}
        </Text>
        <Text>{description}</Text>
        <Flex direction="column" gridGap="0.75rem" pl="0.75rem">
          <Flex direction="column" gridGap="0.25rem" mt="0.25rem">
            {locationItems && <LocationTreeView items={locationItems} />}
          </Flex>
          <Flex direction="column" gridGap="0.75rem">
            {deadlines.map((deadline) => (
              <DeadlineItem key={deadline.id} deadline={deadline} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

export default LessonItem
