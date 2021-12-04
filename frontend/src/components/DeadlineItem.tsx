import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import { Link as RouterLink } from 'react-router-dom'
import { Link, Box, Flex, Icon, Text, useColorModeValue, ButtonGroup, Tooltip, IconButton, useDisclosure } from '@chakra-ui/react'
import { FiEdit, FiPlus, FiX } from 'react-icons/fi'
import { ReactComponent as DeadlineIcon } from '../assets/svg/deadline.svg'
import LocationTreeView from './LocationTreeView'
import ConfirmDialog from './ConfirmDialog'
import SubmitDeadlineDialog from './SubmitDeadlineDialog'
import SubmitFileDialog from './SubmitFileDialog'
import type { Deadline, UserRole } from '../models'
import type { BoxProps } from '@chakra-ui/react'
import RangeDate from './RangeDate'
import RemainTime from './RemainTime'

interface DeadlineItemProps extends BoxProps {
  deadline: Deadline
  userRole?: UserRole
  isInEditingMode?: boolean
  onEdit?(deadlineId: number, name: string, begin: string, end: string, description?: string): Promise<void>
  onDelete?(deadlineId: number): Promise<void>
  onAddFile?(deadlineId: number, formData: FormData): Promise<void>
  onEditFile?(deadlineId: number, fileId: number, formData: FormData): Promise<void>
  onDeleteFile?(deadlineId: number, fileId: number): Promise<void>
}

function DeadlineItem({
  deadline: { id, name, description, locationItems, begin, end, lessonId, isFinished, submitId },
  userRole = 'student',
  isInEditingMode,
  onEdit,
  onDelete,
  onAddFile,
  onEditFile,
  onDeleteFile,
  ...rest
}: DeadlineItemProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const { isOpen: isAddFileOpen, onOpen: onAddFileOpen, onClose: onAddFileClose } = useDisclosure()
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const hoverBg = useColorModeValue('light.hoverable.secondary', 'dark.hoverable.secondary')
  const activeBg = useColorModeValue('light.hoverable.ternary', 'dark.hoverable.ternary')

  async function handleEdit(name: string, begin: string, end: string, description?: string): Promise<void> {
    if (onEdit) await onEdit(id, name, begin, end, description)
  }

  async function handleDelete(): Promise<void> {
    if (onDelete) await onDelete(id)
  }

  async function handleAddFile(formData: FormData): Promise<void> {
    if (onAddFile) await onAddFile(id, formData)
  }

  async function handleEditFile(fileId: number, formData: FormData): Promise<void> {
    if (onEditFile) await onEditFile(id, fileId, formData)
  }

  async function handleDeleteFile(fileId: number): Promise<void> {
    if (onDeleteFile) await onDeleteFile(id, fileId)
  }

  if (userRole === 'lecturer') {
    return (
      <Box pt="0.75rem" pb="1rem" {...rest}>
        <Flex
          role="group"
          gridGap="0.5rem"
          alignItems="center"
          w="100%"
          p="0.25rem"
          borderRadius="6px"
          _hover={{ bg: hoverBg }}
          _active={{ bg: activeBg }}
        >
          <Flex gridGap="0.5rem" alignItems="center" flexGrow="1">
            <Icon fontSize="1.25rem" as={DeadlineIcon} />
            <Link as={RouterLink} to={`lessons/${lessonId}/deadlines/${id}`}>
              {name}
            </Link>
            <Text> - </Text>
            <RangeDate begin={begin} end={end} />
          </Flex>
          {isInEditingMode && (
            <ButtonGroup size="sm" visibility="hidden" _groupHover={{ visibility: 'visible' }} isAttached>
              <Tooltip label={LL.lesson.addDeadlineFile()}>
                <IconButton onClick={onAddFileOpen} aria-label="Add file to deadline" icon={<FiPlus />} />
              </Tooltip>
              <Tooltip label={LL.lesson.editDeadline()}>
                <IconButton onClick={onEditOpen} aria-label="Edit a deadline" icon={<FiEdit />} />
              </Tooltip>
              <Tooltip label={LL.lesson.deleteDeadline()}>
                <IconButton onClick={onDeleteOpen} variant="criticalOutLine" aria-label="Delete deadline item" icon={<FiX />} />
              </Tooltip>
            </ButtonGroup>
          )}
        </Flex>
        {description && <Text>{description}</Text>}
        <Flex direction="column" pl="0.75rem" mt="0.5rem">
          {locationItems && (
            <LocationTreeView
              childType="deadline"
              items={locationItems}
              isInEditingMode={isInEditingMode}
              onEditDeadlineFile={handleEditFile}
              onDeleteDeadlineFile={handleDeleteFile}
            />
          )}
        </Flex>
        <ConfirmDialog
          heading={LL.lesson.deleteDeadline()}
          name={name}
          description={LL.lesson.deleteDeadlineConfirmDescription()}
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          onConfirm={handleDelete}
        />
        <SubmitDeadlineDialog
          heading={LL.lesson.editDeadline()}
          submitButtonContent={LL.common.edit()}
          isUseUserData={true}
          isOpen={isEditOpen}
          onClose={onEditClose}
          name={name}
          description={description}
          begin={begin}
          end={end}
          startDate={begin}
          endDate={end}
          onSubmit={handleEdit}
        />
        <SubmitFileDialog
          heading={LL.lesson.addDeadlineFile()}
          submitButtonContent={LL.common.add()}
          isOpen={isAddFileOpen}
          onClose={onAddFileClose}
          onSubmit={handleAddFile}
        />
      </Box>
    )
  }

  return (
    <Box py="0.75rem" pb="1rem" {...rest}>
      <Flex role="group" gridGap="0.5rem" alignItems="center" w="100%">
        <Flex gridGap="0.5rem" alignItems="center" flexGrow="1">
          <Icon fontSize="1.25rem" as={DeadlineIcon} />
          <Link as={RouterLink} to={`lessons/${lessonId}/submitdeadline/${submitId}`}>
            {name}
          </Link>
          <Text> - </Text>
          <RemainTime begin={begin} end={end} isFinished={isFinished} />
        </Flex>
      </Flex>
      {description && <Text>{description}</Text>}
      <Flex direction="column" pl="0.75rem" mt="0.5rem">
        {locationItems && <LocationTreeView childType="deadlineItem" items={locationItems} />}
      </Flex>
    </Box>
  )
}

export default DeadlineItem
