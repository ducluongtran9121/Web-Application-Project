import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { Container, Flex, Text } from '@chakra-ui/react'

import { Lesson } from '../../models'

import CardSkeleton from '../../components/CardSkeleton'
import LocationTreeView from '../../components/LocationTreeView'
import { useAuth } from '../../contexts/AuthContext'

interface Props {
  courseId: number
}

function CourseLessons({ courseId }: Props): JSX.Element {
  const { getCourseLessons } = useAuth()
  const { t } = useTranslation()
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [lessons, setLessons] = React.useState<Lesson[]>()

  React.useEffect(
    () => {
      async function getData() {
        setLoading(true)
        try {
          const ls = await getCourseLessons(courseId)
          setLessons(ls)
        } catch (err) {}
        setLoading(false)
      }
      getData()
    }, // eslint-disable-next-line
    [],
  )

  if (isLoading) {
    return <CardSkeleton cardNumber="4" />
  }

  if (lessons) {
    return (
      <Flex direction="column" gridGap="0.5rem">
        {lessons.map(({ id, name, description, items }) => (
          <Container key={id} variant="card">
            <Flex direction="column" gridGap="0.25rem">
              <Text fontWeight="semibold" fontSize="1.5rem">
                {name}
              </Text>
              <Text>{description}</Text>
              <LocationTreeView pt="0.5rem" items={items} />
            </Flex>
          </Container>
        ))}
      </Flex>
    )
  }

  return (
    <Flex direction="column" alignItems="center" gridGap="0.5rem">
      <Text textAlign="center" fontSize="5rem">
        ≡(▔﹏▔)≡
      </Text>
      <Text textAlign="center" fontSize="2rem">
        {t('course.noLessons')}
      </Text>
    </Flex>
  )
}

export default CourseLessons
