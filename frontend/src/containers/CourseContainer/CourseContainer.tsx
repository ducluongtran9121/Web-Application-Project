import * as React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useEdit } from '../../contexts/EditContext'
import { Link as RouterLink, Outlet, useParams } from 'react-router-dom'
import { I18nContext } from '../../i18n/i18n-react'
import { Box, Button, Flex, Heading, Icon, Link, Skeleton, Text, useColorModeValue } from '@chakra-ui/react'
import { FiBook, FiUser, FiUsers } from 'react-icons/fi'
import Card from '../../components/Card'
import CardSkeleton from '../../components/CardSkeleton'
import Footer from '../../components/Footer'
import type { Course } from '../../models'

function CourseContainer(): JSX.Element {
  const { user, getUserCourse } = useAuth()
  const { isInEditingMode, setInEditingMode } = useEdit()
  const { LL } = React.useContext(I18nContext)
  const { courseId: courseIdStr } = useParams()
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [isMounted, setMounted] = React.useState<boolean>(false)
  const [course, setCourse] = React.useState<Course>()
  const [courseId, setCourseId] = React.useState<number>(Number(courseIdStr))

  const textColorDefault = useColorModeValue('light.text.default', 'dark.text.default')

  React.useEffect(() => {
    let isCurrentMounted = true
    setMounted(true)

    async function getData(): Promise<void> {
      setLoading(true)

      try {
        const data = await getUserCourse(courseId)
        if (isCurrentMounted) setCourse(data)
        // eslint-disable-next-line no-empty
      } catch {}

      setLoading(false)
    }

    getData()

    return () => {
      isCurrentMounted = false
      setMounted(false)
    }
  }, [])

  React.useEffect(() => {
    async function getData(): Promise<void> {
      if (isMounted) {
        setLoading(true)
        setCourseId(Number(courseIdStr))
      }

      try {
        const data = await getUserCourse(Number(courseIdStr))
        if (isMounted) setCourse(data)
        // eslint-disable-next-line no-empty
      } catch {}

      setLoading(false)
    }

    getData()
  }, [courseIdStr])

  function handleEnterEditMode(): void {
    const inEdit = isInEditingMode
    setInEditingMode(!inEdit)
  }

  return (
    <Box px={{ base: '0.75rem', md: '1.5rem' }} py="1.5rem">
      {isLoading ? (
        <Skeleton h="3rem" />
      ) : (
        <Flex direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'stretch', md: 'center' }} gridGap="1.5rem">
          <Heading flexGrow={1} textAlign={{ base: 'center', md: 'start' }}>
            {`${course?.name} - ${course?.code}`}
          </Heading>
          {user?.role === 'lecturer' && (
            <Button aria-label="Enter edit mode" variant="accent" onClick={handleEnterEditMode}>
              {isInEditingMode ? LL.course.finishEditing() : LL.course.enterEditing()}
            </Button>
          )}
        </Flex>
      )}
      <Flex direction={{ base: 'column', md: 'row' }} gridGap="0.75rem" px={{ base: '0', md: '0.75rem' }}>
        <Box flexGrow={1} pt="2rem" maxW={{ base: 'full', md: '20rem' }}>
          {isLoading ? (
            <CardSkeleton cardNumber="1" />
          ) : (
            <Card>
              <Flex direction="column" alignItems="start" gridGap="0.5rem">
                <Text fontWeight="semibold">{LL.course.description()}:</Text>
                <Text pl="1rem">{course?.description}</Text>
                <Text fontWeight="semibold">{LL.course.lecturers()}:</Text>
                <Flex direction="column" alignItems="start" gridGap="0.25rem">
                  {course?.lecturers.map((lecturer) => (
                    <Text key={lecturer.id} display="flex" gridGap="0.5rem" pl="1rem" alignItems="center">
                      <Icon color={textColorDefault} as={FiUser} />
                      <Text as="span">{lecturer.name}</Text>
                    </Text>
                  ))}
                </Flex>
                <Link mt="0.75rem" display="flex" gridGap="0.5rem" as={RouterLink} alignItems="center" to="">
                  <Icon color={textColorDefault} as={FiBook} />
                  <Text>{LL.course.allLessons()}</Text>
                </Link>
                <Link display="flex" gridGap="0.5rem" as={RouterLink} alignItems="center" to="students">
                  <Icon color={textColorDefault} as={FiUsers} />
                  <Text>{LL.course.allStudents()}</Text>
                </Link>
              </Flex>
            </Card>
          )}
        </Box>
        <Box flexGrow={1} mt="2rem">
          <Outlet />
        </Box>
      </Flex>
      <Footer mt="6rem" />
    </Box>
  )
}

export default CourseContainer
