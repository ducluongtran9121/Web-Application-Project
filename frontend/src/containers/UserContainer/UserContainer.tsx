import * as React from 'react'
import { I18nContext } from '../../i18n/i18n-react'
import { useAuth } from '../../contexts/AuthContext'
import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom'
import { Box, Flex, Heading, Icon, Image, Link, Tab, TabList, Tabs, Text, useColorMode } from '@chakra-ui/react'
import { FiBookOpen, FiCalendar, FiBriefcase, FiMail, FiUser } from 'react-icons/fi'
import Footer from '../../components/Footer'

function UserContainer(): JSX.Element {
  const { user } = useAuth()
  const { LL } = React.useContext(I18nContext)
  const location = useLocation()
  const { colorMode } = useColorMode()
  const [tabIndex, setTabIndex] = React.useState<number>(0)

  React.useEffect(() => {
    if (location.pathname.match('courses')) setTabIndex(1)
    else if (location.pathname.match('deadlines')) setTabIndex(2)
    else setTabIndex(0)
  }, [location])

  return (
    <Box>
      <Flex direction={{ base: 'column', md: 'row' }} px={{ base: '1rem', md: '6rem' }} py="3rem">
        <Flex direction="column" pr={{ base: '0', md: '1.5rem' }} gridGap="1rem">
          <Flex direction={{ base: 'row', md: 'column' }} gridGap="1rem">
            <Image
              w={{ base: '5rem', md: '15rem', lg: '20rem' }}
              h={{ base: '5rem', md: '15rem', lg: '20rem' }}
              borderRadius="full"
              bg="transparent"
              alignSelf="center"
              src={user?.imageUrl}
              border={`1px solid ${colorMode === 'light' ? '#00000022' : '#ffffff12'}`}
              alt="User profile avatar"
            />
            <Flex direction="column">
              <Heading as="h1">{user?.name}</Heading>
              <Text fontSize="1.25rem">{user?.code}</Text>
            </Flex>
          </Flex>
          <Flex direction="column" gridGap="0.5rem">
            <Link display="flex" alignItems="center" gridGap="0.5rem" variant="text">
              <Icon as={FiMail} />
              <Text>{user?.email}</Text>
            </Link>
            <Flex alignItems="center" gridGap="0.5rem">
              <Icon as={FiUser} />
              <Text>{user?.role === 'lecturer' ? LL.user.lecturer() : LL.user.student()}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex flexGrow={1} direction="column" pl={{ base: '0', md: '1.5rem' }} mt={{ base: '1.5rem', md: '0' }}>
          <Tabs overflowX="auto" alignSelf={{ base: 'center', md: 'start' }} variant="solid" index={tabIndex}>
            <TabList>
              <Tab as={RouterLink} to="" gridGap="0.5rem" display="flex">
                <Icon as={FiBookOpen} />
                <Text>{LL.user.overview()}</Text>
              </Tab>
              <Tab as={RouterLink} to="courses" gridGap="0.5rem" display="flex">
                <Icon as={FiBriefcase} />
                <Text>{LL.common.courses()}</Text>
              </Tab>
              {user?.role === 'student' && (
                <Tab as={RouterLink} to="deadlines" gridGap="0.5rem" display="flex">
                  <Icon as={FiCalendar} />
                  <Text>{LL.common.deadlines()}</Text>
                </Tab>
              )}
            </TabList>
          </Tabs>
          <Box mt="2rem">
            <Outlet />
          </Box>
        </Flex>
      </Flex>
      <Footer mt="3rem" />
    </Box>
  )
}

export default UserContainer
