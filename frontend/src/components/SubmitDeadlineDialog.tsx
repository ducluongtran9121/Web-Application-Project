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
  ModalOverlay
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
  begin?: string
  end?: string
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
  begin = '',
  end = '',
  isOpen,
  onSubmit,
  onClose,
  ...rest
}: SubmitDeadlineDialogProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const [nameState, setNameState] = React.useState<string>(name)
  const [descriptionState, setDescriptionState] = React.useState<string>(description)
  const [selectedStartDate, setSelectedStartDate] = React.useState<Date>(startDate)
  const [selectedEndDate, setSelectedEndDate] = React.useState<Date>(endDate)
  const [startTime, setStartTime] = React.useState<string>(begin)
  const [endTime, setEndTime] = React.useState<string>(end)
  const [isLoading, setLoading] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (isOpen && !isUseUserData) {
      const currentTime = `${new Date().getHours()}:${new Date().getMinutes()}`
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

      setLoading(false)
      onClose()
    } catch (err) {
      setLoading(false)
      Promise.reject(err)
    }
  }

  function handleClose(): void {
    if (isUseUserData) {
      setNameState(name), setDescriptionState(description)
      setSelectedStartDate(startDate)
      setSelectedEndDate(endDate)
      setStartTime(begin)
      setEndTime(end)
    } else {
      setNameState('')
      setDescriptionState('')
      setSelectedStartDate(new Date())
      setSelectedEndDate(new Date())
      setStartTime(`${new Date().getHours()}:${new Date().getMinutes()}`)
      setEndTime(`${new Date().getHours()}:${new Date().getMinutes()}`)
    }
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} {...rest}>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit}>
        <ModalHeader>{heading}</ModalHeader>
        <ModalCloseButton />
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
            <SingleDatepicker date={selectedStartDate} onDateChange={setSelectedStartDate} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>{LL.lesson.startTime()}</FormLabel>
            <Input type="time" value={startTime} onChange={handleStartTimeChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>{LL.lesson.endDate()}</FormLabel>
            <SingleDatepicker date={selectedEndDate} onDateChange={setSelectedEndDate} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>{LL.lesson.endTime()}</FormLabel>
            <Input type="time" value={endTime} onChange={handleEndTimeChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter as={Flex} gridGap="0.75rem">
          <Button onClick={onClose}>{LL.common.cancel()}</Button>
          <Button variant="accent" type="submit" isLoading={isLoading}>
            {submitButtonContent}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SubmitDeadlineDialog
