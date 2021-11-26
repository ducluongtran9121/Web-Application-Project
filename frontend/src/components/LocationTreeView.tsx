import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import { Box, ButtonGroup, Flex, Grid, Icon, IconButton, Link, Text, useDisclosure } from '@chakra-ui/react'
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
  onEditFile?(fileId: number, formData: FormData): Promise<void>
  onDeleteFile?(fileId: number): Promise<void>
}

interface LocationTreeViewProps extends FlexProps {
  items: LocationItem[]
  isInEditingMode?: boolean
  onEditFile?(fileId: number, formData: FormData): Promise<void>
  onDeleteFile?(fileId: number): Promise<void>
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
  onEditFile,
  onDeleteFile
}: LocationTreeItemProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const [isOpen, setOpen] = React.useState<boolean>(false)
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure()
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure()

  async function handleEditFile(formData: FormData): Promise<void> {
    if (onEditFile) await onEditFile(id, formData)
  }

  async function handleDeleteFile(): Promise<void> {
    if (onDeleteFile) await onDeleteFile(id)
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
        _hover={{
          cursor: 'pointer'
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
        <Flex role="group" gridColumn="2" alignItems="center" gridGap="0.5rem">
          <Flex flexGrow={1} alignItems="center" gridGap="0.5rem">
            <LocationItemIcon type={type} />
            {type === 'folder' ? (
              <Text>{name}</Text>
            ) : (
              <Link href={fileUrl} target="_blank">
                {name}
              </Link>
            )}
          </Flex>
          {isInEditingMode && type !== 'folder' && (
            <ButtonGroup size="sm" opacity="0" _groupHover={{ opacity: 1 }} isAttached>
              <IconButton aria-label="Edit file" icon={<FiEdit />} onClick={onEditOpen} />
              <IconButton aria-label="Delete location item" icon={<FiX />} onClick={onDeleteOpen} />
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
              isInEditingMode={isInEditingMode}
              onEditFile={onEditFile}
              onDeleteFile={onDeleteFile}
            />
          ))}
        </Flex>
      )}
      <ConfirmDialog
        heading={LL.lesson.deleteFileConfirm()}
        description={LL.lesson.deleteConfirmDescription()}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        onConfirm={handleDeleteFile}
      />
      <SubmitFileDialog
        heading={LL.lesson.editFile()}
        submitButtonContent={LL.common.edit()}
        isOpen={isEditOpen}
        onClose={onEditClose}
        onSubmit={handleEditFile}
      />
    </Box>
  )
}

function LocationTreeView({ items, isInEditingMode = false, onEditFile, onDeleteFile, ...rest }: LocationTreeViewProps): JSX.Element {
  return (
    <Flex direction="column" alignItems="start" gridGap="0.5rem" {...rest}>
      {items.map((item) => (
        <LocationTreeItem key={item.id} item={item} isInEditingMode={isInEditingMode} onEditFile={onEditFile} onDeleteFile={onDeleteFile} />
      ))}
    </Flex>
  )
}

export default LocationTreeView
