import { useTranslation } from 'react-i18next'
import {
  Flex,
  Image,
  Avatar,
  InputGroup,
  Input,
  InputLeftElement,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
} from '@chakra-ui/react'
import { FiSearch, FiBell, FiMenu, FiX } from 'react-icons/fi'
import { User } from '../models'
import logo from '../assets/svgs/logo.svg'

interface Props {
  user: User
}

function NavBar({ user: { name, imageUrl } }: Props) {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const isMd = useBreakpointValue({ base: false, md: true })

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      gridGap="0.75rem"
      px="1.5rem"
      py="0.75rem"
      bg="white"
      boxShadow="sm"
      position="relative"
    >
      <IconButton
        display={{ base: 'inline-block', md: 'none' }}
        aria-label=""
        icon={<Icon as={isOpen ? FiX : FiMenu} fontSize="xl" />}
        onClick={() => (isOpen ? onClose() : onOpen())}
        border="none"
        alignContent="center"
      />
      <Image src={logo} alt="asdas" w="3rem" />
      {(isOpen || isMd) && (
        <Flex
          order={{ base: 1, md: 0 }}
          flex={{ base: '1 1 100%', md: '1 1 0' }}
          direction={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'start', md: 'center' }}
          gridGap="0.75rem"
          fontWeight="semibold"
        >
          <InputGroup w={{ base: 'full', md: '20rem' }}>
            <InputLeftElement children={<Icon as={FiSearch} />} />
            <Input type="search" placeholder={t('navbar.searchBoxPlaceHolder')} />
          </InputGroup>
          <Flex
            alignItems="center"
            gridGap="0.75rem"
            display={{ base: 'flex', md: 'none' }}
          >
            <Avatar src={imageUrl} boxSize="1.5rem" bg="white" />
            <Text>{name}</Text>
          </Flex>
        </Flex>
      )}

      <Flex alignItems="center" gridGap="0.75rem">
        <IconButton
          aria-label=""
          icon={<Icon as={FiBell} fontSize="large" />}
          border="none"
          alignContent="center"
        />
        <Box display={{ base: 'none', md: 'block' }}>
          <Menu>
            <MenuButton>
              <Avatar
                display={{ base: 'none', md: 'inline-block' }}
                bg="white"
                boxSize="2rem"
                src={imageUrl}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>{name}</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Flex>
  )
}

export default NavBar
