import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import { Text, Tooltip, useColorModeValue } from '@chakra-ui/react'
import type { TextProps } from '@chakra-ui/react'
import type { LocalizedString } from 'typesafe-i18n'

interface RemainTimeProps extends TextProps {
  begin: Date
  end: Date
  isFinished?: boolean
  onTimeChange?(isDeadlineOverDue: boolean): void
}

function RemainTime({ begin, end, isFinished, onTimeChange, ...rest }: RemainTimeProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const attentionColor = useColorModeValue('light.status.attention', 'dark.status.attention')
  const cautionColor = useColorModeValue('light.status.caution', 'dark.status.caution')
  const criticalColor = useColorModeValue('light.status.critical', 'dark.status.critical')
  const successColor = useColorModeValue('light.status.success', 'dark.status.success')
  const noneColor = useColorModeValue('light.status.none', 'dark.status.none')
  const [remainTime, setRemainTime] = React.useState<LocalizedString | string>('')
  const [remainTimeColor, setRemainTimeColor] = React.useState<string>('')
  const hourDivisor = 1000 * 3600
  const dayDivisor = hourDivisor * 24

  React.useEffect(() => {
    calculateRemainTime()

    const interval = setInterval(() => {
      calculateRemainTime()
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const calculateRemainTime = React.useCallback((): void => {
    const diff = end.getTime() - Date.now()
    const days = Math.floor(diff / dayDivisor)
    const hours = Math.round((diff % dayDivisor) / hourDivisor)
    setRemainTime(getRemainTimeLocale(days, hours))
    setRemainTimeColor(getRemainTimeColor(days, hours))
    if (onTimeChange) onTimeChange(diff <= 0)
  }, [])

  function getRemainTimeLocale(dayRemain: number, hourRemain: number): LocalizedString | string {
    if (isFinished) return LL.lesson.submitted()

    if (new Date() < begin) return `${LL.lesson.notStart()} - ${LL.common.begin()}: ${begin.toLocaleDateString()} ${begin.toLocaleTimeString()}`

    if (dayRemain <= 0) {
      if (hourRemain <= 0) return LL.lesson.overdue()
      return LL.lesson.timeRemainWithHour({ hour: hourRemain })
    }

    if (hourRemain <= 0) return LL.lesson.timeRemainWithDay({ day: dayRemain })
    return LL.lesson.timeRemainWithDayAndHour({ day: dayRemain, hour: hourRemain })
  }

  function getRemainTimeColor(dayRemain: number, hourRemain: number) {
    if (isFinished) return successColor
    if (new Date() < begin) return noneColor
    if (dayRemain > 0) return attentionColor
    if (hourRemain > 0) return cautionColor
    return criticalColor
  }

  return (
    <Tooltip label={`${begin.toLocaleDateString()} ${begin.toLocaleTimeString()} - ${end.toLocaleDateString()} ${end.toLocaleTimeString()}`}>
      <Text fontWeight="semibold" color={remainTimeColor} {...rest}>
        {remainTime}
      </Text>
    </Tooltip>
  )
}

export default RemainTime
