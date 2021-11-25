import * as React from 'react'
import { Box, Flex, Grid, Icon, Link, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { IoChevronForward } from 'react-icons/io5'
import { ReactComponent as DocumentIcon } from '../assets/svg/document.svg'
import { ReactComponent as FileIcon } from '../assets/svg/file.svg'
import { ReactComponent as FolderIcon } from '../assets/svg/folder.svg'
import { ReactComponent as PdfIcon } from '../assets/svg/pdf.svg'
import type { FlexProps, IconProps } from '@chakra-ui/react'
import type { LocationItem } from '../models'

interface LocationItemIconProps extends IconProps {
  type: string
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

interface LocationTreeItemProps {
  item: LocationItem
}

function LocationTreeItem({ item: { name, type, children, fileUrl } }: LocationTreeItemProps): JSX.Element {
  const [isOpen, setOpen] = React.useState<boolean>(false)

  return (
    <Box>
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
        <Flex gridColumn="2" alignItems="center" gridGap="0.5rem">
          <LocationItemIcon type={type} />
          {type === 'folder' ? (
            <Text>{name}</Text>
          ) : (
            <Link href={fileUrl} target="_blank">
              {name}
            </Link>
          )}
        </Flex>
      </Grid>

      {children && isOpen && (
        <Flex direction="column" pt="0.5rem" pl="1rem" gridGap="0.5rem">
          {children.map((child) => (
            <LocationTreeItem key={child.fileUrl} item={child} />
          ))}
        </Flex>
      )}
    </Box>
  )
}

interface LocationTreeViewProps extends FlexProps {
  items: LocationItem[]
}

function LocationTreeView({ items, ...rest }: LocationTreeViewProps): JSX.Element {
  return (
    <Flex direction="column" alignItems="start" gridGap="0.5rem" {...rest}>
      {items.map((item) => (
        <LocationTreeItem key={item.id} item={item} />
      ))}
    </Flex>
  )
}

export default LocationTreeView