import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import { ButtonGroup, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import { FiPlus, FiX } from 'react-icons/fi'
import Card from './Card'
import DeadlineItem from './DeadlineItem'
import LocationTreeView from './LocationTreeView'
import EditableText from './EditableText'
import ConfirmDialog from './ConfirmDialog'
import SubmitFileDialog from './SubmitFileDialog'
import type { CardProps } from './Card'
import type { Lesson, UserRole } from '../models'

interface LessonItemProps extends CardProps {
  lesson: Lesson
  userRole?: UserRole
  isInEditingMode?: boolean
  onEditSubmit?(lessonId: number, name: string, description: string): Promise<void>
  onDeleteLesson?(lessonId: number): Promise<void>
  onAddFile?(lessonId: number, formData: FormData): Promise<void>
  onEditFile?(lessonId: number, folderId: number, formData: FormData): Promise<void>
  onDeleteFile?(lessonId: number, folderId: number): Promise<void>
}

function LessonItem({
  userRole = 'student',
  lesson: { id, name, description, locationItems, deadlines },
  isInEditingMode = false,
  onEditSubmit,
  onDeleteLesson,
  onAddFile,
  onEditFile,
  onDeleteFile,
  ...rest
}: LessonItemProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure()
  const { isOpen: isAddFileOpen, onOpen: onAddFileOpen, onClose: onAddFileClose } = useDisclosure()

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

  async function handleAddFile(formData: FormData) {
    if (onAddFile) {
      await onAddFile(id, formData)
    }
  }

  async function handleEditFile(fileId: number, formData: FormData) {
    if (onEditFile) {
      await onEditFile(id, fileId, formData)
    }
  }

  async function handleDeleteFile(fileId: number): Promise<void> {
    if (onDeleteFile) {
      await onDeleteFile(id, fileId)
    }
  }

  if (userRole === 'lecturer') {
    return (
      <>
        <Card {...rest}>
          <Flex direction="column" gridGap="0.25rem">
            <Flex gridGap="0.25rem" alignItems="center">
              <EditableText
                fontWeight="semibold"
                fontSize="1.5rem"
                defaultValue={name}
                isInEditingMode={isInEditingMode}
                isRequired={true}
                onEditSubmit={handleNameSubmit}
                flexGrow={1}
              />
              {isInEditingMode && (
                <ButtonGroup isAttached size="sm">
                  <Menu>
                    <Tooltip label={`${LL.common.add()}...`}>
                      <MenuButton aria-label="Add lesson item" as={IconButton} icon={<FiPlus />} />
                    </Tooltip>
                    <MenuList>
                      <MenuItem onClick={onAddFileOpen}>{LL.lesson.file()}</MenuItem>
                      <MenuItem>Deadline</MenuItem>
                    </MenuList>
                  </Menu>
                  <Tooltip label={LL.lesson.delete()}>
                    <IconButton variant="criticalOutLine" aria-label="Delete lesson" icon={<FiX />} onClick={onConfirmOpen} />
                  </Tooltip>
                </ButtonGroup>
              )}
            </Flex>
            {(description || isInEditingMode) && (
              <EditableText defaultValue={description} isInEditingMode={isInEditingMode} onEditSubmit={handleDescriptionSubmit} />
            )}
            <Flex direction="column" gridGap="0.75rem" pl="0.75rem">
              <Flex direction="column" gridGap="0.25rem" mt="0.25rem">
                {locationItems && (
                  <LocationTreeView
                    items={locationItems}
                    isInEditingMode={isInEditingMode}
                    onEditFile={handleEditFile}
                    onDeleteFile={handleDeleteFile}
                  />
                )}
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
          heading={LL.lesson.delete()}
          name={name}
          description={LL.lesson.deleteConfirmDescription()}
          isOpen={isConfirmOpen}
          onClose={onConfirmClose}
          onConfirm={handleDeleteLesson}
        />
        <SubmitFileDialog
          heading={LL.lesson.addFile()}
          submitButtonContent={LL.common.add()}
          closeOnOverlayClick={false}
          isOpen={isAddFileOpen}
          onClose={onAddFileClose}
          onSubmit={handleAddFile}
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
