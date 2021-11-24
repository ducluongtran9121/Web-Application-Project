import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import { Link as RouterLink } from 'react-router-dom'
import { Link, Box, Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { ReactComponent as DeadlineIcon } from '../assets/svg/deadline.svg'
import LocationTreeView from './LocationTreeView'
import type { Deadline } from '../models'
import type { LocalizedString } from 'typesafe-i18n'

interface DeadlineItemProps {
  deadline: Deadline
}

function DeadlineItem({ deadline: { name, locationItems, end } }: DeadlineItemProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const [dayRemain, setDayRemain] = React.useState<number>(0)
  const [hourRemain, setHourRemain] = React.useState<number>(0)
  const attentionColor = useColorModeValue('light.status.attention', 'dark.status.attention')
  const cautionColor = useColorModeValue('light.status.caution', 'dark.status.caution')
  const criticalColor = useColorModeValue('light.status.critical', 'dark.status.critical')
  const hourDivisor = 1000 * 3600
  const dayDivisor = hourDivisor * 24

  const calculateTimeRemain = React.useCallback((): void => {
    const diff = end.getTime() - Date.now()
    setDayRemain(Math.floor(diff / dayDivisor))
    setHourRemain(Math.round((diff % dayDivisor) / hourDivisor))
  }, [])

  React.useEffect(() => {
    calculateTimeRemain()

    const interval = setInterval(() => {
      calculateTimeRemain()
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  function getRemainTimeColor(dayRemain: number, hourRemain: number) {
    if (dayRemain > 0) return attentionColor
    if (hourRemain > 0) return cautionColor
    return criticalColor
  }

  function getRemainTime(dayRemain: number, hourRemain: number): LocalizedString {
    if (dayRemain === 0) {
      if (hourRemain === 0) return LL.lesson.overdue()
      return LL.lesson.timeRemainWithHour({ hour: hourRemain })
    }
    return LL.lesson.timeRemainWithDay({ day: dayRemain, hour: hourRemain })
  }

  return (
    <Box>
      <Flex gridGap="0.5rem" alignItems="center">
        <Icon fontSize="1.25rem" as={DeadlineIcon}></Icon>
        <Link as={RouterLink} to="/">
          {name}
        </Link>
        <Text> - </Text>
        <Text textAlign="center" fontWeight="semibold" color={getRemainTimeColor(dayRemain, hourRemain)}>
          {getRemainTime(dayRemain, hourRemain)}
        </Text>
      </Flex>
      <Flex direction="column" pl="0.75rem" mt="0.5rem">
        {locationItems && <LocationTreeView items={locationItems} />}
      </Flex>
    </Box>
  )
}

export default DeadlineItem
