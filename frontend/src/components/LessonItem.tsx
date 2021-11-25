import * as React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import Card from './Card'
import DeadlineItem from './DeadlineItem'
import LocationTreeView from './LocationTreeView'
import EditableText from './EditableText'
import type { CardProps } from './Card'
import type { Lesson, UserRole } from '../models'

interface LessonItemProps extends CardProps {
  lesson: Lesson
  userRole?: UserRole
  isInEditingMode?: boolean
  onEditSubmit(lessonId: number, name: string, description: string): Promise<void>
}

function LessonItem({
  userRole,
  lesson: { id, name, description, locationItems, deadlines },
  isInEditingMode,
  onEditSubmit,
  ...rest
}: LessonItemProps): JSX.Element {
  async function handleNameSubmit(currentValue: string) {
    await onEditSubmit(id, currentValue, description)
    name = currentValue
  }

  async function handleDescriptionSubmit(currentValue: string) {
    await onEditSubmit(id, name, currentValue)
    description = currentValue
  }

  if (userRole === 'lecturer') {
    return (
      <Card {...rest}>
        <Flex direction="column" gridGap="0.25rem">
          <EditableText
            fontWeight="semibold"
            fontSize="1.5rem"
            defaultValue={name}
            isInEditingMode={isInEditingMode}
            isRequired={true}
            onEditSubmit={handleNameSubmit}
          />
          <EditableText defaultValue={description} isInEditingMode={isInEditingMode} onEditSubmit={handleDescriptionSubmit} />
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
