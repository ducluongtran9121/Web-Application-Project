import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import {
  Box,
  ButtonGroup,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { FiPlus, FiX } from 'react-icons/fi'
import Card from './Card'
import DeadlineItem from './DeadlineItem'
import LocationTreeView from './LocationTreeView'
import EditableText from './EditableText'
import ConfirmDialog from './ConfirmDialog'
import SubmitFileDialog from './SubmitFileDialog'
import SubmitDeadlineDialog from './SubmitDeadlineDialog'
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
  onCreateDeadline?(lessonId: number, name: string, begin: string, end: string, description?: string): Promise<void>
  onEditDeadline?(lessonId: number, deadlineId: number, name: string, begin: string, end: string, description?: string): Promise<void>
  onDeleteDeadline?(lessonId: number, deadlineId: number): Promise<void>
  onAddDeadlineFile?(lessonId: number, deadlineId: number, formData: FormData): Promise<void>
  onEditDeadlineFile?(lessonId: number, deadlineId: number, fileId: number, formData: FormData): Promise<void>
  onDeleteDeadlineFile?(lessonId: number, deadlineId: number, fileId: number): Promise<void>
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
  onCreateDeadline,
  onEditDeadline,
  onDeleteDeadline,
  onAddDeadlineFile,
  onEditDeadlineFile,
  onDeleteDeadlineFile,
  ...rest
}: LessonItemProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure()
  const { isOpen: isAddFileOpen, onOpen: onAddFileOpen, onClose: onAddFileClose } = useDisclosure()
  const { isOpen: isAddDeadlineOpen, onOpen: onAddDeadlineOpen, onClose: onAddDeadlineClose } = useDisclosure()
  const borderControlColor = useColorModeValue('light.border.control', 'dark.border.control')

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
    if (onDeleteLesson) await onDeleteLesson(id)
  }

  async function handleAddFile(formData: FormData) {
    if (onAddFile) await onAddFile(id, formData)
  }

  async function handleEditFile(fileId: number, formData: FormData) {
    if (onEditFile) await onEditFile(id, fileId, formData)
  }

  async function handleDeleteFile(fileId: number): Promise<void> {
    if (onDeleteFile) await onDeleteFile(id, fileId)
  }

  async function handleCreateDeadline(name: string, begin: string, end: string, description?: string): Promise<void> {
    if (onCreateDeadline) await onCreateDeadline(id, name, begin, end, description)
  }

  async function handleEditDeadline(deadlineId: number, name: string, begin: string, end: string, description?: string): Promise<void> {
    if (onEditDeadline) await onEditDeadline(id, deadlineId, name, begin, end, description)
  }

  async function handleDeleteDeadline(deadlineId: number): Promise<void> {
    if (onDeleteDeadline) await onDeleteDeadline(id, deadlineId)
  }

  async function handleAddDeadlineFile(deadlineId: number, formData: FormData): Promise<void> {
    if (onAddDeadlineFile) await onAddDeadlineFile(id, deadlineId, formData)
  }

  async function handleEditDeadlineFile(deadlineId: number, fileId: number, formData: FormData): Promise<void> {
    if (onEditDeadlineFile) await onEditDeadlineFile(id, deadlineId, fileId, formData)
  }

  async function handleDeleteDeadlineFile(deadlineId: number, fileId: number): Promise<void> {
    if (onDeleteDeadlineFile) await onDeleteDeadlineFile(id, deadlineId, fileId)
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
                      <MenuItem onClick={onAddDeadlineOpen}>Deadline</MenuItem>
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
                    childType="lesson"
                    items={locationItems}
                    isInEditingMode={isInEditingMode}
                    onEditFile={handleEditFile}
                    onDeleteFile={handleDeleteFile}
                  />
                )}
              </Flex>
              <Flex direction="column" gridGap="0.75rem">
                {deadlines.length !== 0 && <Box h="0.5px" bg={borderControlColor} />}
                {deadlines.map((deadline) => (
                  <DeadlineItem
                    key={deadline.id}
                    userRole={userRole}
                    deadline={deadline}
                    isInEditingMode={isInEditingMode}
                    onEdit={handleEditDeadline}
                    onDelete={handleDeleteDeadline}
                    onAddFile={handleAddDeadlineFile}
                    onEditFile={handleEditDeadlineFile}
                    onDeleteFile={handleDeleteDeadlineFile}
                    borderBottom="1px"
                    borderBottomColor={borderControlColor}
                  />
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
        <SubmitDeadlineDialog
          heading={LL.lesson.createNewDeadline()}
          submitButtonContent={LL.common.create()}
          closeOnOverlayClick={false}
          isOpen={isAddDeadlineOpen}
          onClose={onAddDeadlineClose}
          onSubmit={handleCreateDeadline}
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
            {locationItems && <LocationTreeView childType="deadline" items={locationItems} />}
          </Flex>
          <Flex direction="column" gridGap="0.75rem">
            {deadlines.length !== 0 && <Box h="0.5px" bg={borderControlColor} />}
            {deadlines.map((deadline) => (
              <DeadlineItem key={deadline.id} deadline={deadline} userRole={userRole} borderBottom="1px" borderBottomColor={borderControlColor} />
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}

export default LessonItem
