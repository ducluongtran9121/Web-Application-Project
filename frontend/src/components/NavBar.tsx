/* eslint-disable react/no-children-prop */
import * as React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { I18nContext } from '../i18n/i18n-react'
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Image,
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
import { FiX, FiLogOut, FiMenu } from 'react-icons/fi'
import { ReactComponent as Logo } from '../assets/svg/logo.svg'
import SearchBox from './SearchBox'
import type { User, Course, Deadline, Lesson } from '../models'
import type { Locales } from '../i18n/i18n-types'

interface NavBarProps {
  user: User
  courses?: Course[]
  lessons?: Lesson[]
  deadlines?: Deadline[]
  isCoursesSpinnerLoading?: boolean
  isLessonsSpinnerLoading?: boolean
  isDeadlinesSpinnerLoading?: boolean
  onSearchBoxFocus?(): void
  onSearchBoxChange?(): void
  onSearchBoxBlur?(): void
  signOut(): Promise<void>
}

function NavBar({
  user: { id, name, imageUrl, role },
  courses,
  lessons,
  deadlines,
  isCoursesSpinnerLoading,
  isLessonsSpinnerLoading,
  isDeadlinesSpinnerLoading,
  onSearchBoxFocus,
  onSearchBoxChange,
  onSearchBoxBlur,
  signOut
}: NavBarProps): JSX.Element {
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
        aria-label="Nav bar toggle button"
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
          <Box
            position="relative"
            w={{ base: '100%', md: '20rem' }}
            _focusWithin={{
              w: { md: '30rem' }
            }}
            transition="width"
            transitionTimingFunction="ease-in-out"
            transitionDuration="0.4s"
          >
            <SearchBox
              w="100%"
              role={role}
              placeholder={LL.navbar.searchBoxPlaceHolder()}
              courses={courses}
              lessons={lessons}
              deadlines={deadlines}
              isCoursesSpinnerLoading={isCoursesSpinnerLoading}
              isLessonsSpinnerLoading={isLessonsSpinnerLoading}
              isDeadlinesSpinnerLoading={isDeadlinesSpinnerLoading}
              onSearchBoxFocus={onSearchBoxFocus}
              onSearchBoxChange={onSearchBoxChange}
              onSearchBoxBlur={onSearchBoxBlur}
            />
          </Box>
          <Flex direction="column" justifyContent="stretch" gridGap="0.75rem" display={{ base: 'flex', md: 'none' }} w="full">
            <Link variant="menu" as={RouteLink} to={`/users/${id}`} display="flex" gridGap="0.5rem" alignItems="center">
              <Image borderRadius="full" alt="User avatar" src={imageUrl} boxSize="1.25rem" bg="white" />
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
        <Box display={{ base: 'none', md: 'block' }}>
          <Menu>
            <MenuButton aria-label="Avatar button">
              <Image borderRadius="full" display={{ base: 'none', md: 'inline-block' }} bg="white" boxSize="2rem" src={imageUrl} alt="User avatar" />
            </MenuButton>
            <MenuList minW="15rem">
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
              {role === 'student' && (
                <MenuItem as={RouteLink} to={`users/${id}/deadlines`}>
                  {LL.navbar.yourDeadlines()}
                </MenuItem>
              )}
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
