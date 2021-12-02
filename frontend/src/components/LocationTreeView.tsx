import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import { Box, ButtonGroup, Flex, Grid, Icon, IconButton, Link, Text, Tooltip, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { IoChevronForward } from 'react-icons/io5'
import { FiEdit, FiX } from 'react-icons/fi'
import { ReactComponent as DocumentIcon } from '../assets/svg/document.svg'
import { ReactComponent as FileIcon } from '../assets/svg/file.svg'
import { ReactComponent as FolderIcon } from '../assets/svg/folder.svg'
import { ReactComponent as PdfIcon } from '../assets/svg/pdf.svg'
import ConfirmDialog from './ConfirmDialog'
import SubmitFileDialog from './SubmitFileDialog'
import type { FlexProps, IconProps } from '@chakra-ui/react'
import type { LocationItem } from '../models'

interface LocationItemIconProps extends IconProps {
  type: string
}

interface LocationTreeItemProps {
  item: LocationItem
  isInEditingMode: boolean
  childType: 'lesson' | 'deadline'
  onEditFile?(fileId: number, formData: FormData): Promise<void>
  onDeleteFile?(fileId: number): Promise<void>
  onEditDeadlineFile?(fileId: number, formDate: FormData): Promise<void>
  onDeleteDeadlineFile?(fileId: number): Promise<void>
}

interface LocationTreeViewProps extends FlexProps {
  items: LocationItem[]
  isInEditingMode?: boolean
  childType: 'lesson' | 'deadline'
  onEditFile?(fileId: number, formData: FormData): Promise<void>
  onDeleteFile?(fileId: number): Promise<void>
  onEditDeadlineFile?(fileId: number, formDate: FormData): Promise<void>
  onDeleteDeadlineFile?(fileId: number): Promise<void>
}

function LocationItemIcon({ type, ...rest }: LocationItemIconProps): JSX.Element {
  function SelectIcon(): React.FunctionComponent<React.SVGProps<SVGSVGElement>> {
    switch (type) {
      case 'folder':
        return FolderIcon
      case '.pdf':
        return PdfIcon
      case '.doc':
      case '.docx':
      case '.txt':
        return DocumentIcon
      default:
        return FileIcon
    }
  }

  const icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = SelectIcon()

  return <Icon fontSize="1.25rem" {...rest} as={icon} />
}

function LocationTreeItem({
  item: { id, name, type, children, fileUrl },
  isInEditingMode,
  childType,
  onEditFile,
  onDeleteFile,
  onEditDeadlineFile,
  onDeleteDeadlineFile
}: LocationTreeItemProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const hoverBg = useColorModeValue('light.hoverable.secondary', 'dark.hoverable.secondary')
  const activeBg = useColorModeValue('light.hoverable.ternary', 'dark.hoverable.ternary')
  const [isMounted, setMounted] = React.useState<boolean>(false)
  const [isOpen, setOpen] = React.useState<boolean>(false)
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()
  const { isOpen: isEditDeadlineOpen, onOpen: onEditDeadlineOpen, onClose: onEditDeadlineClose } = useDisclosure()
  const { isOpen: isDeleteDeadlineOpen, onOpen: onDeleteDeadlineOpen, onClose: onDeleteDeadlineClose } = useDisclosure()

  React.useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  function handleEditClose(): void {
    if (isMounted) onEditClose()
  }

  function handleEditDeadlineClose(): void {
    if (isMounted) onEditDeadlineClose()
  }

  async function handleEditFile(formData: FormData): Promise<void> {
    if (onEditFile) await onEditFile(id, formData)
  }

  async function handleDeleteFile(): Promise<void> {
    if (onDeleteFile) await onDeleteFile(id)
  }

  async function handleEditDeadlineFile(formData: FormData): Promise<void> {
    if (onEditDeadlineFile) await onEditDeadlineFile(id, formData)
  }

  async function handleDeleteDeadlineFile(): Promise<void> {
    if (onDeleteDeadlineFile) await onDeleteDeadlineFile(id)
  }

  return (
    <Box w="100%">
      <Grid
        templateColumns="1rem auto"
        gridGap="0.5rem"
        alignItems="center"
        onClick={() => {
          isOpen ? setOpen(false) : setOpen(true)
        }}
      >
        {children && (
          <motion.div
            initial={false}
            animate={isOpen ? 'up' : 'down'}
            variants={{
              up: {
                rotate: [0, 90]
              },
              down: {
                rotate: [90, 0]
              }
            }}
            transition={{ ease: 'easeInOut', duration: 0.12, delay: 0.12 }}
          >
            <IoChevronForward />
          </motion.div>
        )}
        <Flex
          role="group"
          gridColumn="2"
          alignItems="center"
          p="0.25rem"
          gridGap="0.5rem"
          borderRadius="6px"
          _hover={{
            cursor: 'pointer',
            bg: hoverBg
          }}
          _active={{
            bg: activeBg
          }}
        >
          <Flex flexGrow={1} alignItems="center" gridGap="0.5rem">
            <LocationItemIcon type={type} />
            {type === 'folder' ? (
              <Text>{name}</Text>
            ) : (
              <Link href={fileUrl} target="_blank" w="100%" textAlign="left">
                {name}
              </Link>
            )}
          </Flex>
          {isInEditingMode && type !== 'folder' && (
            <ButtonGroup size="sm" visibility="hidden" _groupHover={{ visibility: 'visible' }} isAttached>
              {childType === 'lesson' ? (
                <>
                  <Tooltip label={LL.lesson.editFile()}>
                    <IconButton aria-label="Edit a file" icon={<FiEdit />} onClick={onEditOpen} />
                  </Tooltip>
                  <Tooltip label={LL.lesson.deleteFile()}>
                    <IconButton variant="criticalOutLine" aria-label="Delete location item" icon={<FiX />} onClick={onDeleteOpen} />
                  </Tooltip>
                </>
              ) : (
                <>
                  <Tooltip label={LL.lesson.editDeadlineFile()}>
                    <IconButton aria-label="Edit a deadline file" icon={<FiEdit />} onClick={onEditDeadlineOpen} />
                  </Tooltip>
                  <Tooltip label={LL.lesson.deleteDeadlineFile()}>
                    <IconButton variant="criticalOutLine" aria-label="Delete location item" icon={<FiX />} onClick={onDeleteDeadlineOpen} />
                  </Tooltip>
                </>
              )}
            </ButtonGroup>
          )}
        </Flex>
      </Grid>

      {children && isOpen && (
        <Flex direction="column" justifyContent="stretch" pt="0.5rem" pl="1rem" gridGap="0.5rem">
          {children.map((child) => (
            <LocationTreeItem
              key={child.fileUrl}
              item={child}
              childType={childType}
              isInEditingMode={isInEditingMode}
              onEditFile={onEditFile}
              onDeleteFile={onDeleteFile}
              onEditDeadlineFile={onEditDeadlineFile}
              onDeleteDeadlineFile={onDeleteDeadlineFile}
            />
          ))}
        </Flex>
      )}
      {childType === 'lesson' ? (
        <>
          <SubmitFileDialog
            heading={LL.lesson.editFile()}
            submitButtonContent={LL.common.edit()}
            isOpen={isEditOpen}
            onClose={handleEditClose}
            onSubmit={handleEditFile}
          />
          <ConfirmDialog
            heading={LL.lesson.deleteFile()}
            name={name}
            description={LL.lesson.deleteFileConfirmDescription()}
            isOpen={isDeleteOpen}
            onClose={onDeleteClose}
            onConfirm={handleDeleteFile}
          />
        </>
      ) : (
        <>
          <SubmitFileDialog
            heading={LL.lesson.editDeadlineFile()}
            submitButtonContent={LL.common.edit()}
            isOpen={isEditDeadlineOpen}
            onClose={handleEditDeadlineClose}
            onSubmit={handleEditDeadlineFile}
          />
          <ConfirmDialog
            heading={LL.lesson.deleteDeadlineFile()}
            name={name}
            description={LL.lesson.deleteFileConfirmDescription()}
            isOpen={isDeleteDeadlineOpen}
            onClose={onDeleteDeadlineClose}
            onConfirm={handleDeleteDeadlineFile}
          />
        </>
      )}
    </Box>
  )
}

function LocationTreeView({
  items,
  isInEditingMode = false,
  childType,
  onEditFile,
  onDeleteFile,
  onEditDeadlineFile,
  onDeleteDeadlineFile,
  ...rest
}: LocationTreeViewProps): JSX.Element {
  return (
    <Flex direction="column" alignItems="start" gridGap="0.5rem" {...rest}>
      {items.map((item) => (
        <LocationTreeItem
          key={item.id}
          item={item}
          childType={childType}
          isInEditingMode={isInEditingMode}
          onEditFile={onEditFile}
          onDeleteFile={onDeleteFile}
          onEditDeadlineFile={onEditDeadlineFile}
          onDeleteDeadlineFile={onDeleteDeadlineFile}
        />
      ))}
    </Flex>
  )
}

export default LocationTreeView
