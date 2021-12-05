import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue
} from '@chakra-ui/react'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import type { ModalProps } from '@chakra-ui/react'

interface SubmitDeadlineDialogProps extends Omit<ModalProps, 'children'> {
  children?: JSX.Element
  heading: string
  submitButtonContent: string
  isUseUserData?: boolean
  name?: string
  description?: string
  startDate?: Date
  endDate?: Date
  begin?: Date
  end?: Date
  onSubmit?(name: string, begin: string, end: string, description?: string): Promise<void>
}

function SubmitDeadlineDialog({
  heading,
  submitButtonContent,
  isUseUserData = false,
  name = '',
  description = '',
  startDate = new Date(),
  endDate = new Date(),
  begin = new Date(),
  end = new Date(),
  isOpen,
  onSubmit,
  onClose,
  ...rest
}: SubmitDeadlineDialogProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const [isMounted, setMounted] = React.useState<boolean>(false)
  const [nameState, setNameState] = React.useState<string>(name)
  const [descriptionState, setDescriptionState] = React.useState<string>(description)
  const [selectedStartDate, setSelectedStartDate] = React.useState<Date>(startDate)
  const [selectedEndDate, setSelectedEndDate] = React.useState<Date>(endDate)
  const [startTime, setStartTime] = React.useState<string>(getTimeString(begin))
  const [endTime, setEndTime] = React.useState<string>(getTimeString(end))
  const [isLoading, setLoading] = React.useState<boolean>(false)
  const accentColor = useColorModeValue('light.accent.default', 'dark.accent.default')
  const accentTernaryColor = useColorModeValue('light.accent.ternary', 'dark.accent.ternary')
  const borderControlColor = useColorModeValue('light.border.control', 'dark.border.control')
  React.useEffect(() => {
    setMounted(true)
    return () => {
      setMounted(false)
    }
  }, [])

  function getTimeString(date: Date): string {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    let hoursString = hours.toString()
    let minutesString = minutes.toString()
    if (hours < 10) hoursString = '0' + hoursString
    if (minutes < 10) minutesString = '0' + minutesString
    return `${hoursString}:${minutesString}`
  }

  React.useEffect(() => {
    if (isOpen && !isUseUserData) {
      const currentTime = getTimeString(new Date())
      setStartTime(currentTime)
      setEndTime(currentTime)
    }
  }, [isOpen])

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setNameState(e.target.value)
  }

  function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setDescriptionState(e.target.value)
  }

  function handleStartTimeChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setStartTime(e.target.value)
  }

  function handleEndTimeChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setEndTime(e.target.value)
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()

    try {
      setLoading(true)

      if (onSubmit) {
        const startDate = new Date(selectedStartDate.toDateString() + ' ' + startTime)
        const endDate = new Date(selectedEndDate.toDateString() + ' ' + endTime)
        await onSubmit(nameState, startDate.toISOString(), endDate.toISOString(), descriptionState)
      }

      if (isMounted) setLoading(false)
      onClose()
    } catch (err) {
      Promise.reject(err)
    }

    if (isMounted) setLoading(false)
  }

  function handleClose(): void {
    if (isUseUserData) {
      setNameState(name)
      setDescriptionState(description)
      setSelectedStartDate(startDate)
      setSelectedEndDate(endDate)
      setStartTime(getTimeString(begin))
      setEndTime(getTimeString(end))
    } else {
      setNameState('')
      setDescriptionState('')
      setSelectedStartDate(new Date())
      setSelectedEndDate(new Date())
      setStartTime(getTimeString(new Date()))
      setEndTime(getTimeString(new Date()))
    }
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} {...rest}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>{heading}</ModalHeader>
        <ModalCloseButton aria-label="Close submit deadline dialog" />
        <ModalBody as={Flex} flexDirection="column" gridGap="0.75rem">
          <FormControl isRequired>
            <FormLabel>{LL.lesson.name()}</FormLabel>
            <Input placeholder={LL.lesson.deadlineNamePlaceholder()} value={nameState} onChange={handleNameChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>{LL.lesson.description()}</FormLabel>
            <Input placeholder={LL.lesson.deadlineDescriptionPlaceholder()} value={descriptionState} onChange={handleDescriptionChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>{LL.lesson.startDate()}</FormLabel>
            <SingleDatepicker
              date={selectedStartDate}
              onDateChange={setSelectedStartDate}
              propsConfigs={{
                dateNavBtnProps: {
                  borderColor: borderControlColor
                },
                dayOfMonthBtnProps: {
                  selectedBg: accentColor,
                  _hover: {
                    bg: accentTernaryColor
                  }
                }
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>{LL.lesson.startTime()}</FormLabel>
            <Input type="time" value={startTime} onChange={handleStartTimeChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>{LL.lesson.endDate()}</FormLabel>
            <SingleDatepicker
              date={selectedEndDate}
              onDateChange={setSelectedEndDate}
              propsConfigs={{
                dateNavBtnProps: {
                  borderColor: borderControlColor
                },
                dayOfMonthBtnProps: {
                  selectedBg: accentColor,
                  _hover: {
                    bg: accentTernaryColor
                  }
                }
              }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>{LL.lesson.endTime()}</FormLabel>
            <Input type="time" value={endTime} onChange={handleEndTimeChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter as={Flex} gridGap="0.75rem">
          <Button aria-label="Cancel submit deadline dialog" onClick={onClose}>
            {LL.common.cancel()}
          </Button>
          <Button aria-label="Submit deadline" variant="accent" type="submit" isLoading={isLoading}>
            {submitButtonContent}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SubmitDeadlineDialog
