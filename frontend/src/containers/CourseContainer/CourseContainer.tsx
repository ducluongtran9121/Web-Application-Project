import * as React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link as RouterLink, Outlet, useParams } from 'react-router-dom'
import { I18nContext } from '../../i18n/i18n-react'
import { Box, Flex, Heading, Icon, Link, Skeleton, Text, useColorModeValue } from '@chakra-ui/react'
import { IoPeopleOutline, IoPersonOutline } from 'react-icons/io5'

import Card from '../../components/Card'
import CardSkeleton from '../../components/CardSkeleton'

import type { Course } from '../../models'

function CourseContainer(): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const { getUserCourse } = useAuth()
  const { courseId } = useParams()
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [course, setCourse] = React.useState<Course>()

  const textColorDefault = useColorModeValue('light.text.default', 'dark.text.default')

  React.useEffect(() => {
    async function getData() {
      setLoading(true)

      try {
        const data = await getUserCourse(Number(courseId))
        setCourse(data)
        // eslint-disable-next-line no-empty
      } catch {}

      setLoading(false)
    }

    getData()
  }, [])

  return (
    <Box px={{ base: '0.75rem', md: '1.5rem' }} py="1.5rem">
      {isLoading ? <Skeleton h="3rem" /> : <Heading textAlign={{ base: 'center', md: 'start' }}>{course?.name}</Heading>}
      <Flex direction={{ base: 'column', md: 'row' }} gridGap="0.75rem" px={{ base: '0', md: '0.75rem' }}>
        <Box flexGrow={1} pt="2rem" maxW={{ base: 'full', md: '20rem' }}>
          {isLoading ? (
            <CardSkeleton cardNumber="1" />
          ) : (
            <Card>
              <Flex direction="column" alignItems="start" gridGap="0.5rem">
                <Text fontWeight="semibold">{LL.courses.description()}:</Text>
                <Text pl="1rem">{course?.description}</Text>
                <Text fontWeight="semibold">{LL.courses.lecturers()}:</Text>
                <Flex direction="column" alignItems="start" gridGap="0.25rem">
                  {course?.lecturers.map((lecturer) => (
                    <Link as={RouterLink} key={lecturer.id} display="flex" gridGap="0.5rem" pl="1rem" alignItems="center" to="/">
                      <Icon color={textColorDefault} as={IoPersonOutline} />
                      <Text>{lecturer.name}</Text>
                    </Link>
                  ))}
                </Flex>
                <Link display="flex" gridGap="0.5rem" as={RouterLink} alignItems="center" to="students">
                  <Icon color={textColorDefault} as={IoPeopleOutline} />
                  <Text>{LL.courses.allStudents()}</Text>
                </Link>
              </Flex>
            </Card>
          )}
        </Box>
        <Box flexGrow={1} mt="2rem">
          <Outlet />
        </Box>
      </Flex>
    </Box>
  )
}

export default CourseContainer
