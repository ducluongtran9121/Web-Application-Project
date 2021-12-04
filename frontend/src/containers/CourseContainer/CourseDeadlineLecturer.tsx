import * as React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useParams } from 'react-router-dom'
import { I18nContext } from '../../i18n/i18n-react'
import { Avatar, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import CardSkeleton from '../../components/CardSkeleton'
import Card from '../../components/Card'
import RangeDate from '../../components/RangeDate'
import type { Deadline, DeadlineStatus } from '../../models'
import LocationTreeView from '../../components/LocationTreeView'

function CourseDeadlineLecturer(): JSX.Element {
  const { getLecturerDeadline, listStudentsDeadlineStatus } = useAuth()
  const { LL } = React.useContext(I18nContext)
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [deadline, setDeadline] = React.useState<Deadline>()
  const [statuses, setStatuses] = React.useState<DeadlineStatus[]>()
  const criticalColor = useColorModeValue('light.status.critical', 'dark.status.critical')
  const successColor = useColorModeValue('light.status.success', 'dark.status.success')
  const { lessonId: lessonIdStr, deadlineId: deadlineIdStr } = useParams()
  const lessonId = Number(lessonIdStr)
  const deadlineId = Number(deadlineIdStr)

  React.useEffect(() => {
    let isMounted = true

    async function getData(): Promise<void> {
      if (isMounted) setLoading(true)

      try {
        const [deadlineData, statusesData] = await Promise.all([
          getLecturerDeadline(lessonId, deadlineId),
          listStudentsDeadlineStatus(lessonId, deadlineId)
        ])
        if (isMounted) {
          setDeadline(deadlineData)
          setStatuses(statusesData)
        }
        // eslint-disable-next-line no-empty
      } catch {}

      if (isMounted) setLoading(false)
    }

    getData()

    return () => {
      isMounted = false
    }
  }, [])

  function getColor(isFinished: boolean) {
    return isFinished ? successColor : criticalColor
  }

  if (isLoading) {
    return (
      <Flex direction="column" gridGap="0.5rem">
        <CardSkeleton cardNumber="2" />
      </Flex>
    )
  }
  if (!deadline || !statuses) {
    return <Heading textAlign="center">{`~(>_<。)＼ ${LL.common.error()}!`}</Heading>
  }

  return (
    <Flex direction="column" gridGap="0.5rem">
      <Flex as={Card} textAlign={{ base: 'center', md: 'left' }} direction="column" gridGap="0.75rem">
        <Heading>{deadline.name}</Heading>
        <Text>{deadline.description}</Text>
        <RangeDate key={deadline.begin.toString() + deadline.end.toString()} begin={deadline.begin} end={deadline.end} />
      </Flex>
      {statuses.map(({ id, member, isFinished, submitItems }) => (
        <Flex key={id} as={Card} direction="column">
          <Flex alignItems="center" gridGap="0.5rem">
            <Avatar bg="transparent" size="xs" name={member.name} src={member.imageUrl} />
            <Text>{member.name}</Text>
            <Text> - </Text>
            <Text fontWeight="semibold" color={getColor(isFinished)}>
              {isFinished ? `${LL.lesson.submitted()}` : `${LL.lesson.notSubmitted()}`}
            </Text>
          </Flex>
          {submitItems.length > 0 && <LocationTreeView mt="1.5rem" items={submitItems} childType="deadline" />}
        </Flex>
      ))}
    </Flex>
  )
}

export default CourseDeadlineLecturer
