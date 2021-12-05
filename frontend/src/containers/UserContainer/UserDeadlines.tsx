import * as React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { I18nContext } from '../../i18n/i18n-react'
import { Flex, Text, Link } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import CardSkeleton from '../../components/CardSkeleton'
import Card from '../../components/Card'
import RemainTime from '../../components/RemainTime'
import { sortDeadlines } from '../../helpers'
import type { Deadline } from '../../models'

function UserDeadlines(): JSX.Element {
  const { getStudentDeadlines } = useAuth()
  const { LL } = React.useContext(I18nContext)
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [deadlines, setDeadlines] = React.useState<Deadline[]>()

  React.useEffect(() => {
    let isMounted = true

    async function getData(): Promise<void> {
      setLoading(true)

      try {
        const data = await getStudentDeadlines()
        if (isMounted) setDeadlines(sortDeadlines(data))
        // eslint-disable-next-line no-empty
      } catch {}

      if (isMounted) setLoading(false)
    }

    getData()

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return <CardSkeleton cardNumber="4" />
  }

  if (!deadlines || deadlines.length === 0) {
    return (
      <Flex direction="column" alignItems="center">
        <Text textAlign="center" fontSize="3rem">
          🙃 {LL.user.survived()}
        </Text>
      </Flex>
    )
  }
  return (
    <Flex direction="column" gridGap="0.5rem">
      {deadlines.map(
        ({ id, name, description, courseId, lessonId, submitId, begin, end, isFinished, finishAt, courseName, lessonName, courseCode }) => (
          <Flex key={id} as={Card} variant="hoverable" direction="column" gridGap="0.5rem">
            <Flex alignItems="center" gridGap="0.5rem">
              <Link
                as={RouterLink}
                fontWeight="semibold"
                fontSize="1.25rem"
                variant="text"
                to={`/courses/${courseId}/lessons/${lessonId}/submitdeadline/${submitId}`}
              >
                {name}
              </Link>
              <Text as="span">-</Text>
              <RemainTime begin={begin} end={end} isFinished={isFinished} />
              {isFinished && (
                <>
                  <Text as="span">-</Text>
                  <Text>{finishAt?.toLocaleDateString()}</Text>
                </>
              )}
            </Flex>
            <Text>{description}</Text>
            <Link as={RouterLink} textAlign="left" to={`/courses/${courseId}`}>{`${courseName} - ${courseCode} > ${lessonName}`}</Link>
          </Flex>
        )
      )}
    </Flex>
  )
}

export default UserDeadlines
