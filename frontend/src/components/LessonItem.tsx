import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import {
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { FiPlus, FiX } from 'react-icons/fi'
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
  onAddFile?(lessonId: number, formData: FormData): Promise<void>
}

function LessonItem({
  userRole = 'student',
  lesson: { id, name, description, locationItems, deadlines },
  isInEditingMode = false,
  onEditSubmit,
  onDeleteLesson,
  onAddFile,
  ...rest
}: LessonItemProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const { isOpen: isConfirmOpen, onOpen: onConfirmOpen, onClose: onConfirmClose } = useDisclosure()
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure()
  const fileUpLoadFileInputRef = React.useRef<HTMLInputElement>(null)
  const nameFileInputRef = React.useRef<HTMLInputElement>(null)
  const inFolderFileInputRef = React.useRef<HTMLInputElement>(null)
  const [isAddingFile, setAddingFile] = React.useState<boolean>(false)

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

  async function handleAddFile(e: React.FormEvent): Promise<void> {
    e.preventDefault()

    setAddingFile(true)

    if (onAddFile && nameFileInputRef.current?.value && fileUpLoadFileInputRef.current?.files && inFolderFileInputRef.current) {
      const formData = new FormData()
      formData.append('name', nameFileInputRef.current.value)
      formData.append('file_upload', fileUpLoadFileInputRef.current.files[0])
      formData.append('in_folder', inFolderFileInputRef.current.value)
      await onAddFile(id, formData)
    }

    setAddingFile(false)
    onAddClose()
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
                    <MenuButton aria-label="add lesson item" as={IconButton} icon={<FiPlus />} />
                    <MenuList>
                      <MenuItem onClick={onAddOpen}>{LL.lesson.file()}</MenuItem>
                      <MenuItem>Deadline</MenuItem>
                    </MenuList>
                  </Menu>
                  <IconButton aria-label="delete lesson" icon={<FiX />} onClick={onConfirmOpen} />
                </ButtonGroup>
              )}
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
          isOpen={isConfirmOpen}
          onClose={onConfirmClose}
          onConfirm={handleDeleteLesson}
        />
        <Modal closeOnOverlayClick={false} isOpen={isAddOpen} onClose={onAddClose}>
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleAddFile}>
            <ModalHeader>{LL.lesson.addFile()}</ModalHeader>
            <ModalCloseButton />
            <ModalBody as={Flex} flexDirection="column" gridGap="0.75rem">
              <FormControl isRequired>
                <FormLabel>{LL.lesson.fileUpload()}</FormLabel>
                <Input type="file" border="0" ref={fileUpLoadFileInputRef} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>{LL.lesson.name()}</FormLabel>
                <Input placeholder={LL.lesson.fileNamePlaceHolder()} ref={nameFileInputRef} />
              </FormControl>
              <FormControl>
                <FormLabel>{LL.lesson.folder()}</FormLabel>
                <Input placeholder={LL.lesson.folderPlaceholder()} ref={inFolderFileInputRef} />
              </FormControl>
            </ModalBody>
            <ModalFooter as={Flex} gridGap="0.75rem">
              <Button onClick={onAddClose}>{LL.common.cancel()}</Button>
              <Button variant="accent" type="submit" isLoading={isAddingFile}>
                {LL.common.add()}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
