/* eslint-disable react/no-children-prop */
import * as React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { I18nContext } from '../i18n/i18n-react'
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
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Text,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react'
import { FiX, FiLogOut, FiMenu, FiBell, FiSearch } from 'react-icons/fi'
import { ReactComponent as Logo } from '../assets/svg/logo.svg'
import type { User } from '../models'
import type { Locales } from '../i18n/i18n-types'

interface NavBarProps {
  user: User
  signOut(): Promise<void>
}

function NavBar({ user: { id, name, imageUrl }, signOut }: NavBarProps): JSX.Element {
  const { LL, locale, setLocale } = React.useContext(I18nContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const isMd = useBreakpointValue({ base: false, md: true })

  async function handleSignOut(): Promise<void> {
    await signOut()
  }

  function handleChangeLanguage(e: React.MouseEvent<HTMLButtonElement>): void {
    if (e.currentTarget.value !== locale) {
      setLocale(e.currentTarget.value as Locales)
      localStorage.setItem('lang', e.currentTarget.value)
    }
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      gridGap="0.75rem"
      px="1.5rem"
      py="0.75rem"
      boxShadow="sm"
      position="relative"
      bg={useColorModeValue('light.card.default', 'dark.card.default')}
    >
      <IconButton
        display={{ base: 'inline-block', md: 'none' }}
        aria-label="nav toggle button"
        bg="transparent"
        icon={<Icon as={isOpen ? FiX : FiMenu} fontSize="xl" />}
        onClick={() => (isOpen ? onClose() : onOpen())}
        border="none"
        alignContent="center"
      />
      <Link as={RouteLink} to="/" textColor="transparent">
        <Image as={Logo} alt={LL.common.logoAlt()} w="3rem" />
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
            <InputLeftElement children={<Icon as={FiSearch} />} />
            <Input type="search" placeholder={LL.navbar.searchBoxPlaceHolder()} />
          </InputGroup>
          <Flex direction="column" justifyContent="stretch" gridGap="0.75rem" display={{ base: 'flex', md: 'none' }} w="full">
            <Link variant="menu" as={RouteLink} to={`/users/${id}`} display="flex" gridGap="0.5rem" alignItems="center">
              <Avatar src={imageUrl} boxSize="1.25rem" bg="white" />
              <Text>{name}</Text>
            </Link>
            <Link variant="menu" onClick={handleSignOut} display="flex" gridGap="0.5rem" alignItems="center">
              <Icon fontSize="1.25rem" as={FiLogOut} />
              <Text>{LL.navbar.signOut()}</Text>
            </Link>
          </Flex>
        </Flex>
      )}

      <Flex alignItems="center" gridGap="0.75rem">
        <IconButton aria-label="" bg="transparent" icon={<Icon as={FiBell} fontSize="large" />} border="none" alignContent="center" />
        <Box display={{ base: 'none', md: 'block' }}>
          <Menu>
            <MenuButton>
              <Avatar display={{ base: 'none', md: 'inline-block' }} bg="white" boxSize="2rem" src={imageUrl} />
            </MenuButton>
            <MenuList>
              <MenuItem as={RouteLink} to={`users/${id}`}>
                {name}
              </MenuItem>
              <MenuDivider />
              <MenuItem as={RouteLink} to={`users/${id}`}>
                {LL.navbar.yourProfile()}
              </MenuItem>
              <MenuItem as={RouteLink} to={`users/${id}/courses`}>
                {LL.navbar.yourCourses()}
              </MenuItem>
              <MenuItem as={RouteLink} to={`users/${id}/deadlines`}>
                {LL.navbar.yourDeadlines()}
              </MenuItem>
              <MenuDivider />
              <MenuOptionGroup defaultValue={locale} title={LL.navbar.languages()} type="radio">
                <MenuItemOption onClick={handleChangeLanguage} value="en">
                  English
                </MenuItemOption>
                <MenuItemOption onClick={handleChangeLanguage} value="vi">
                  Tiếng Việt
                </MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider />
              <MenuOptionGroup defaultValue={colorMode === 'dark' ? 'darkMode' : undefined} title={LL.navbar.appearance()} type="checkbox">
                <MenuItemOption value="darkMode" onClick={toggleColorMode}>
                  {LL.navbar.darkMode()}
                </MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider />
              <MenuItem onClick={handleSignOut}>{LL.navbar.signOut()}</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Flex>
  )
}

export default NavBar
