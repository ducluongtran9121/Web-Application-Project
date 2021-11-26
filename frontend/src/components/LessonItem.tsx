import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import { Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import { FiX } from 'react-icons/fi'
import Card from './Card'
import DeadlineItem from './DeadlineItem'
import LocationTreeView from './LocationTreeView'
import EditableText from './EditableText'
import ConfirmDialog from './ConfirmDialog'
import type { CardProps } from './Card'
import type { Lesson, UserRole } from '../models'

interface LessonItemProps extends CardProps {
  lesson: Lesson
  userRole?: UserRole
  isInEditingMode?: boolean
  onEditSubmit?(lessonId: number, name: string, description: string): Promise<void>
  onDeleteLesson?(lessonId: number): Promise<void>
}

function LessonItem({
  userRole = 'student',
  lesson: { id, name, description, locationItems, deadlines },
  isInEditingMode = false,
  onEditSubmit,
  onDeleteLesson,
  ...rest
}: LessonItemProps): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { LL } = React.useContext(I18nContext)

  async function handleNameSubmit(currentValue: string): Promise<void> {
    if (onEditSubmit) {
      await onEditSubmit(id, currentValue, description)
      name = currentValue
    }
  }

  async function handleDescriptionSubmit(currentValue: string): Promise<void> {
    if (onEditSubmit) {
      await onEditSubmit(id, name, currentValue)
      description = currentValue
    }
  }

  async function handleDeleteLesson(): Promise<void> {
    if (onDeleteLesson) {
      await onDeleteLesson(id)
    }
  }

  if (userRole === 'lecturer') {
    return (
      <>
        <Card {...rest}>
          <Flex direction="column" gridGap="0.25rem">
            <Flex gridGap="0.25rem">
              <EditableText
                fontWeight="semibold"
                fontSize="1.5rem"
                defaultValue={name}
                isInEditingMode={isInEditingMode}
                isRequired={true}
                onEditSubmit={handleNameSubmit}
                flexGrow={1}
              />
              {isInEditingMode && <IconButton aria-label="delete lesson" icon={<FiX />} onClick={onOpen} />}
            </Flex>
            {(description || isInEditingMode) && (
              <EditableText defaultValue={description} isInEditingMode={isInEditingMode} onEditSubmit={handleDescriptionSubmit} />
            )}
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
        <ConfirmDialog
          heading={LL.lesson.deleteConfirm()}
          description={LL.lesson.deleteConfirmDescription()}
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleDeleteLesson}
        />
      </>
    )
  }

  return (
    <Card {...rest}>
      <Flex direction="column" gridGap="0.25rem">
        <Text fontWeight="semibold" fontSize="1.5rem">
          {name}
        </Text>
        {description && <Text>{description}</Text>}
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
