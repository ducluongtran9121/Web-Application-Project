import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { Route, Link as RouteLink } from 'react-router-dom'

import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  Skeleton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { IoPeopleOutline, IoPersonOutline } from 'react-icons/io5'

import { Course } from '../../models'

import CardSkeleton from '../../components/CardSkeleton'
import Footer from '../../components/Footer'
import { useAuth } from '../../contexts/AuthContext'
import CourseLessons from './CourseLessons'
import CourseStudents from './CourseStudents'

function CourseContainer(): JSX.Element {
  const { getCurrentUserCourse } = useAuth()
  const { t } = useTranslation()
  const state = useParams<{ courseId: string }>()
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [course, setCourse] = React.useState<Course>()

  const courseId = Number(state.courseId)
  const textColorDefault = useColorModeValue(
    'light.text.default',
    'dark.text.default',
  )

  React.useEffect(
    () => {
      async function getData() {
        setLoading(true)
        try {
          const c = await getCurrentUserCourse(courseId)
          setCourse(c)
        } catch (err) {}
        setLoading(false)
      }

      getData()
    }, // eslint-disable-next-line
    [],
  )

  return (
    <Box>
      <Box px="1rem" pt="2rem">
        {isLoading ? (
          <Skeleton h="3rem" />
        ) : (
          <Heading textAlign={{ base: 'center', md: 'left' }} as="h1">
            {course?.name}
          </Heading>
        )}
      </Box>
      <Flex direction={{ base: 'column', md: 'row' }}>
        <Box
          flexGrow={1}
          px="1rem"
          pt="2rem"
          maxW={{ base: 'full', md: '20rem' }}
        >
          {isLoading ? (
            <CardSkeleton cardNumber="1" />
          ) : (
            <Container variant="card">
              <Flex direction="column" alignItems="start" gridGap="0.5rem">
                <Text fontWeight="semibold">{t('course.description')}:</Text>
                <Text pl="1rem">{course?.description}</Text>
                <Text fontWeight="semibold">{t('course.lecturers')}:</Text>
                <Flex direction="column" alignItems="start" gridGap="0.5rem">
                  {course?.lecturers.map((lecturer) => (
                    <Link
                      as={RouteLink}
                      key={lecturer.id}
                      display="flex"
                      gridGap="0.5rem"
                      pl="1rem"
                      alignItems="center"
                      to="/"
                    >
                      <Icon color={textColorDefault} as={IoPersonOutline} />
                      <Text>{lecturer.name}</Text>
                    </Link>
                  ))}
                </Flex>
                <Link
                  display="flex"
                  gridGap="0.5rem"
                  as={RouteLink}
                  alignItems="center"
                  to={`/courses/${courseId}/students`}
                >
                  <Icon color={textColorDefault} as={IoPeopleOutline} />
                  <Text>{t('course.allStudents')}</Text>
                </Link>
              </Flex>
            </Container>
          )}
        </Box>
        <Box flexGrow={1} px="1rem" mt="2rem">
          <Route exact path="/courses/:courseId/">
            <CourseLessons courseId={courseId} />
          </Route>
          <Route exact path="/courses/:courseId/students">
            <CourseStudents courseId={courseId} />
          </Route>
        </Box>
      </Flex>
      <Footer pt="10rem" isBackgroundTransparent={true} />
    </Box>
  )
}

export default CourseContainer
