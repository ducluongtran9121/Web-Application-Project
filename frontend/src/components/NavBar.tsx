import { useTranslation } from 'react-i18next'
import { Link as RouteLink } from 'react-router-dom'

import {
  Avatar,
  Box,
  Flex,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import {
  IoCloseOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoNotificationsOutline,
  IoSearchOutline,
} from 'react-icons/io5'

import logo from '../assets/svgs/logo.svg'

import type { User } from '../models'

import { useAuth } from '../contexts/AuthContext'

interface Props {
  user: User
}

function NavBar({ user: { id, name, imageUrl } }: Props): JSX.Element {
  const { signOut } = useAuth()
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const isMd = useBreakpointValue({ base: false, md: true })

  const baseBg = useColorModeValue('light.card.default', 'dark.card.default')

  async function handleSignOut() {
    await signOut()
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      gridGap="0.75rem"
      px="1.5rem"
      py="0.75rem"
      bg={baseBg}
      boxShadow="sm"
      position="relative"
    >
      <IconButton
        display={{ base: 'inline-block', md: 'none' }}
        aria-label=""
        bg="transparent"
        icon={
          <Icon as={isOpen ? IoCloseOutline : IoMenuOutline} fontSize="xl" />
        }
        onClick={() => (isOpen ? onClose() : onOpen())}
        border="none"
        alignContent="center"
      />
      <Link as={RouteLink} to="/" textColor="transparent">
        <Image src={logo} alt={t('logoAlt')} w="3rem" />
      </Link>
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
            <InputLeftElement children={<Icon as={IoSearchOutline} />} />
            <Input
              type="search"
              placeholder={t('navBar.searchBoxPlaceHolder')}
            />
          </InputGroup>
          <Flex
            direction="column"
            justifyContent="stretch"
            gridGap="0.75rem"
            display={{ base: 'flex', md: 'none' }}
            w="full"
          >
            <Link
              variant="menu"
              as={RouteLink}
              to={`/users/${id}`}
              display="flex"
              gridGap="0.5rem"
              alignItems="center"
            >
              <Avatar src={imageUrl} boxSize="1.25rem" bg="white" />
              <Text>{name}</Text>
            </Link>
            <Link
              variant="menu"
              onClick={handleSignOut}
              display="flex"
              gridGap="0.5rem"
              alignItems="center"
            >
              <Icon fontSize="1.25rem" as={IoLogOutOutline} />
              <Text>{t('navBar.signOut')}</Text>
            </Link>
          </Flex>
        </Flex>
      )}

      <Flex alignItems="center" gridGap="0.75rem">
        <IconButton
          aria-label=""
          bg="transparent"
          icon={<Icon as={IoNotificationsOutline} fontSize="large" />}
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
              <MenuItem as={RouteLink} to={`/users/${id}`}>
                {name}
              </MenuItem>
              <MenuDivider />
              <MenuItem as={RouteLink} to={`/users/${id}`}>
                {t('navBar.yourProfile')}
              </MenuItem>
              <MenuItem as={RouteLink} to={`/users/${id}/courses`}>
                {t('navBar.yourCourses')}
              </MenuItem>
              <MenuItem as={RouteLink} to={`/users/${id}/deadlines`}>
                {t('navBar.yourDeadlines')}
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={toggleColorMode}>
                {t(
                  `navBar.turn${colorMode === 'light' ? 'On' : 'Off'}DarkMode`,
                )}
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>{t('navBar.signOut')}</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Flex>
  )
}

export default NavBar
