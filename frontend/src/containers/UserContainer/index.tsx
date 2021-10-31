import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Route, useHistory } from 'react-router-dom'

import {
  Avatar,
  Box,
  Flex,
  Heading,
  Icon,
  Link,
  Tab,
  TabList,
  Tabs,
  Text,
} from '@chakra-ui/react'
import {
  IoAlbumsOutline,
  IoBookOutline,
  IoCalendarOutline,
  IoMailOutline,
  IoPersonOutline,
} from 'react-icons/io5'

import Footer from '../../components/Footer'
import { useAuth } from '../../contexts/AuthContext'
import UserCourses from './UserCourses'
import UserDeadlines from './UserDeadlines'
import UserOverview from './UserOverview'

function UserContainer(): JSX.Element {
  const { user } = useAuth()
  const { t } = useTranslation()
  const history = useHistory()
  let startUpTab: number = 0

  if (window.location.pathname.match('courses')) startUpTab = 1
  if (window.location.pathname.match('deadlines')) startUpTab = 2

  return (
    <Box>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        px={{ base: '1rem', md: '6rem' }}
        py="3rem"
      >
        <Flex
          direction="column"
          pr={{ base: '0', md: '1.5rem' }}
          gridGap="1rem"
        >
          <Flex direction={{ base: 'row', md: 'column' }} gridGap="1rem">
            <Avatar
              w={{ base: '5rem', md: '20rem' }}
              h={{ base: '5rem', md: '20rem' }}
              bg="transparent"
              alignSelf="center"
              src={user?.imageUrl}
              border="1px"
            />
            <Flex direction="column">
              <Heading as="h1">{user?.name}</Heading>
              <Text fontSize="1.25rem">{user?.code}</Text>
            </Flex>
          </Flex>
          <Flex direction="column" gridGap="0.5rem">
            <Link
              display="flex"
              alignItems="center"
              gridGap="0.5rem"
              variant="text"
            >
              <Icon as={IoMailOutline} />
              <Text>{user?.email}</Text>
            </Link>
            <Flex alignItems="center" gridGap="0.5rem">
              <Icon as={IoPersonOutline} />
              <Text>{t(`user.${user?.role}`)}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          flexGrow={1}
          direction="column"
          pl={{ base: '1.5rem', md: '0' }}
          mt={{ base: '1.5rem', md: '0' }}
        >
          <Tabs index={startUpTab}>
            <TabList>
              <Tab
                onClick={() => history.push(`/users/${user?.id}`)}
                gridGap="0.5rem"
                display="flex"
              >
                <Icon as={IoBookOutline} />
                <Text>{t('user.overview')}</Text>
              </Tab>
              <Tab
                onClick={() => history.push(`/users/${user?.id}/courses`)}
                gridGap="0.5rem"
                display="flex"
              >
                <Icon as={IoAlbumsOutline} />
                <Text>{t('user.courses')}</Text>
              </Tab>
              <Tab
                onClick={() => history.push(`/users/${user?.id}/deadlines`)}
                gridGap="0.5rem"
                display="flex"
              >
                <Icon as={IoCalendarOutline} />
                <Text>{t('user.deadlines')}</Text>
              </Tab>
            </TabList>
          </Tabs>
          <Box mt="2rem">
            <Route exact path="/users/:userId">
              <UserOverview />
            </Route>
            <Route path="/users/:userId/courses">
              <UserCourses />
            </Route>
            <Route path="/users/:userId/deadlines">
              <UserDeadlines />
            </Route>
          </Box>
        </Flex>
      </Flex>
      <Footer pt="3rem" isBackgroundTransparent={true} />
    </Box>
  )
}

export default UserContainer
