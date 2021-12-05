import * as React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNotification } from '../../contexts/NotificationContext'
import { I18nContext } from '../../i18n/i18n-react'
import { Button, Flex, Grid, GridItem, Heading, IconButton, Text, useDisclosure } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import Card from '../../components/Card'
import CardSkeleton from '../../components/CardSkeleton'
import RangeDate from '../../components/RangeDate'
import LocationTreeView from '../../components/LocationTreeView'
import RemainTime from '../../components/RemainTime'
import SubmitFileDialog from '../../components/SubmitFileDialog'
import type { Deadline } from '../../models'
import { FiPlus } from 'react-icons/fi'
import { addSubmitFileDeadline, deleteSubmitFileDeadline } from '../../helpers'

function CourseDeadlineStudent(): JSX.Element {
  const {
    getStudentDeadlineSubmit,
    addStudentDeadlineFile,
    editStudentDeadlineFile,
    deleteStudentDeadlineFile,
    submitStudentDeadline,
    unsubmitStudentDeadline
  } = useAuth()
  const { notify } = useNotification()
  const { LL } = React.useContext(I18nContext)
  const { isOpen: isAddFileOpen, onOpen: onAddFileOpen, onClose: onAddFileClose } = useDisclosure()
  const [deadline, setDeadline] = React.useState<Deadline>()
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [isSubmitLoading, setSubmitLoading] = React.useState<boolean>(false)
  const [isMounted, setMounted] = React.useState<boolean>(false)
  const [isOverDue, setOverDue] = React.useState<boolean>(false)
  const [isSubmittingFile, setSubmittingFile] = React.useState<boolean>(false)
  const { lessonId: lessonIdStr, submitId: submitIdStr } = useParams()
  const [lessonId, setLessonId] = React.useState<number>(Number(lessonIdStr))
  const [submitId, setSubmitId] = React.useState<number>(Number(submitIdStr))

  React.useEffect(() => {
    let isCurrentMounted = true
    setMounted(true)

    async function getData(): Promise<void> {
      setLoading(true)

      try {
        const data = await getStudentDeadlineSubmit(lessonId, submitId)
        if (isCurrentMounted) setDeadline(data)
        // eslint-disable-next-line no-empty
      } catch {}

      if (isCurrentMounted) setLoading(false)
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
        setLessonId(Number(lessonIdStr))
        setSubmitId(Number(submitIdStr))
      }
      try {
        const data = await getStudentDeadlineSubmit(Number(lessonIdStr), Number(submitIdStr))
        if (isMounted) setDeadline(data)
        // eslint-disable-next-line no-empty
      } catch {}

      if (isMounted) setLoading(false)
    }

    getData()
  }, [lessonIdStr, submitIdStr])

  function handleRemainTimeChange(isDeadlineOverDue: boolean): void {
    setOverDue(isDeadlineOverDue)
  }

  async function handleAddDeadlineFile(formData: FormData): Promise<void> {
    try {
      const data = await addStudentDeadlineFile(lessonId, submitId, formData)
      if (isMounted) setDeadline((previousValue) => addSubmitFileDeadline(previousValue, data))
      notify('info', 'addSubmitDeadlineFile')
    } catch {
      notify('error', 'addSubmitDeadlineFile')
    }
  }

  async function handleEditDeadlineFile(fileId: number, formData: FormData): Promise<void> {
    try {
      const data = await editStudentDeadlineFile(lessonId, submitId, fileId, formData)
      if (isMounted)
        setDeadline((previousValue) => {
          const value = deleteSubmitFileDeadline(previousValue, fileId, false)
          return addSubmitFileDeadline(value, data)
        })
      notify('info', 'editSubmitDeadlineFile')
    } catch {
      notify('error', 'editSubmitDeadlineFile')
    }
  }

  async function handleDeleteDeadlineFile(fileId: number): Promise<void> {
    try {
      await deleteStudentDeadlineFile(lessonId, submitId, fileId)
      if (deadline && deadline.submitItems && deadline.isFinished && deadline.submitItems.length === 1) {
        const data = await unsubmitStudentDeadline(lessonId, submitId)
        if (isMounted) setDeadline(data)
      } else if (isMounted) setDeadline((previousValue) => deleteSubmitFileDeadline(previousValue, fileId))
      notify('info', 'deleteSubmitDeadlineFile')
    } catch {
      notify('error', 'deleteSubmitDeadlineFile')
    }
  }

  async function handleSubmitDeadline(): Promise<void> {
    try {
      if (isMounted) setSubmitLoading(true)
      const data = await submitStudentDeadline(lessonId, submitId)
      if (isMounted) {
        setDeadline(data)
        setSubmitLoading(false)
      }
      notify('info', 'deleteSubmitDeadlineFile')
    } catch {
      notify('error', 'deleteSubmitDeadlineFile')
    }
  }

  if (isLoading) {
    return (
      <Flex direction="column" gridGap="0.5rem">
        <CardSkeleton cardNumber="2" />
      </Flex>
    )
  }

  if (!deadline) {
    return <Heading>{`~(>_<。)＼ ${LL.common.error()}!`}</Heading>
  }

  function handleSubmitFile(): void {
    setSubmittingFile(true)
  }

  function handleCancel(): void {
    setSubmittingFile(false)
  }

  return (
    <Flex direction="column" gridGap="0.5rem">
      <Flex as={Card} textAlign={{ base: 'center', md: 'left' }} direction="column" gridGap="0.75rem">
        <Heading>{deadline.name}</Heading>
        <Text>{deadline.description}</Text>
        <RangeDate key={deadline.begin.toString() + deadline.end.toString()} begin={deadline.begin} end={deadline.end} />
      </Flex>
      <Flex as={Card} direction="column" gridGap="1.5rem">
        <Grid templateRows="1fr 1ft 1ft auto" templateColumns="auto 1fr" alignItems="center" rowGap="1rem" columnGap="1.5rem">
          <GridItem fontWeight="semibold">{`${LL.lesson.submissionStatus()}:`}</GridItem>
          <GridItem>{deadline.isFinished ? `${LL.lesson.submitted()} 🥰` : `${LL.lesson.notSubmitted()} 😖`}</GridItem>
          <GridItem fontWeight="semibold">{`${LL.lesson.remainTime()}:`}</GridItem>
          <GridItem>
            <RemainTime
              key={deadline.finishAt?.toString()}
              begin={deadline.begin}
              end={deadline.end}
              isFinished={deadline.isFinished}
              onTimeChange={handleRemainTimeChange}
            />
          </GridItem>
          <GridItem fontWeight="semibold">{`${LL.lesson.finishedAt()}:`}</GridItem>
          <GridItem>{deadline.finishAt ? deadline.finishAt.toLocaleDateString() : LL.common.none()}</GridItem>
          <GridItem fontWeight="semibold" alignSelf="start">
            {`${LL.lesson.submittedFiles()}:`}
          </GridItem>
          <GridItem>
            {deadline.submitItems && deadline.submitItems.length > 0 ? (
              <LocationTreeView
                items={deadline.submitItems}
                childType="deadline"
                isInEditingMode={isSubmittingFile}
                onEditSubmitDeadlineFile={handleEditDeadlineFile}
                onDeleteSubmitDeadlineFile={handleDeleteDeadlineFile}
              />
            ) : (
              LL.common.none()
            )}
          </GridItem>
        </Grid>
        <Flex flexDirection="column" gridGap="0.5rem">
          {!isOverDue && (
            <>
              {isSubmittingFile ? (
                <IconButton onClick={onAddFileOpen} aria-label="Add new submit file" icon={<FiPlus />}></IconButton>
              ) : (
                <Button aria-label="Submit file" onClick={handleSubmitFile}>
                  {deadline.submitItems && deadline.submitItems.length > 0 ? LL.lesson.editSubmittedFiles() : LL.lesson.addSubmitFile()}
                </Button>
              )}
              {!deadline.isFinished && (
                <Button
                  aria-label="Submit file"
                  variant="accent"
                  onClick={handleSubmitDeadline}
                  isLoading={isSubmitLoading}
                  isDisabled={deadline.submitItems && deadline.submitItems.length <= 0}
                >
                  {LL.common.submit()}
                </Button>
              )}
              {isSubmittingFile && (
                <Button aria-label="Cancel submit" variant="criticalOutLine" onClick={handleCancel}>
                  {LL.common.cancel()}
                </Button>
              )}
            </>
          )}
        </Flex>
      </Flex>
      {!isOverDue && (
        <SubmitFileDialog
          isOpen={isAddFileOpen}
          onClose={onAddFileClose}
          submitButtonContent={LL.common.add()}
          heading={LL.lesson.addSubmitDeadlineFile()}
          onSubmit={handleAddDeadlineFile}
        ></SubmitFileDialog>
      )}
    </Flex>
  )
}

export default CourseDeadlineStudent
