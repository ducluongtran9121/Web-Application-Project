import * as React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useEdit } from '../../contexts/EditContext'
import { useNotification } from '../../contexts/NotificationContext'
import { useParams } from 'react-router-dom'
import { I18nContext } from '../../i18n/i18n-react'
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure
} from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import CardSkeleton from '../../components/CardSkeleton'
import LessonItem from '../../components/LessonItem'
import Card from '../../components/Card'
import {
  addDeadlineToLessons,
  addFileToLessons,
  addFileToLessonsDeadline,
  deleteLessonsDeadline,
  deleteLessonsDeadlineFile,
  deleteLessonsFile,
  editLessonsDeadline
} from '../../helpers'
import type { Lesson } from '../../models'

function CourseLessons(): JSX.Element {
  const {
    user,
    getCourseLessons,
    createNewLesson,
    editCourseLesson,
    deleteCourseLesson,
    addCourseLessonFile,
    editCourseLessonFile,
    deleteCourseLessonFile,
    createNewLessonDeadline,
    editLessonDeadline,
    deleteLessonDeadline,
    addLessonDeadlineFile,
    editLessonDeadlineFile,
    deleteLessonDeadlineFile
  } = useAuth()
  const { isInEditingMode } = useEdit()
  const { LL } = React.useContext(I18nContext)
  const { courseId: courseIdStr } = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { notify } = useNotification()
  const nameNewLessonInputRef = React.useRef<HTMLInputElement>(null)
  const descriptionNewLessonInputRef = React.useRef<HTMLInputElement>(null)
  const [isMounted, setMounted] = React.useState<boolean>(false)
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [isNewLessonLoading, setNewLessonLoading] = React.useState<boolean>(false)
  const [lessons, setLessons] = React.useState<Lesson[]>()
  const [courseId, setCourseId] = React.useState<number>(Number(courseIdStr))

  React.useEffect(() => {
    let isCurrentMounted = true
    setMounted(true)

    async function getData(): Promise<void> {
      setLoading(true)

      try {
        const data = await getCourseLessons(Number(courseId))
        if (isCurrentMounted) setLessons(data)
        // eslint-disable-next-line no-empty
      } catch {}

      if (isCurrentMounted) setLoading(false)
    }

    getData()

    return () => {
      isCurrentMounted = false
      setMounted(false)
    }
  }, [user])

  React.useEffect(() => {
    async function getData(): Promise<void> {
      if (isMounted) {
        setLoading(true)
        setCourseId(Number(courseIdStr))
      }

      try {
        const data = await getCourseLessons(Number(courseIdStr))
        if (isMounted) setLessons(data)
        // eslint-disable-next-line no-empty
      } catch {}

      if (isMounted) setLoading(false)
    }

    getData()
  }, [courseIdStr])

  async function handleCreateLesson(e: React.FormEvent): Promise<void> {
    e.preventDefault()

    setNewLessonLoading(true)

    try {
      if (nameNewLessonInputRef.current && descriptionNewLessonInputRef.current) {
        const data = await createNewLesson(courseId, nameNewLessonInputRef.current?.value, descriptionNewLessonInputRef.current?.value)

        if (isMounted) {
          const currentLessons = lessons
          currentLessons?.push(data)
          setLessons(currentLessons)
        }

        notify('info', 'createLesson')
      } else throw 'Invalid Data'
    } catch {
      notify('error', 'createLesson')
    }

    setNewLessonLoading(false)
  }

  async function handleEditLesson(lessonId: number, name: string, description: string): Promise<void> {
    try {
      await editCourseLesson(courseId, lessonId, name, description)
      // eslint-disable-next-line no-empty
    } catch {}
  }

  async function handleDeleteLesson(lessonId: number): Promise<void> {
    try {
      await deleteCourseLesson(courseId, lessonId)
      if (isMounted) setLessons((previousValue) => previousValue?.filter((lesson) => lesson.id !== lessonId))
      notify('info', 'deleteLesson')
    } catch {
      notify('error', 'deleteLesson')
    }
  }

  async function handleAddFile(lessonId: number, formData: FormData) {
    try {
      const data = await addCourseLessonFile(courseId, lessonId, formData)
      if (isMounted) setLessons((previousValue) => addFileToLessons(previousValue, lessonId, data))
      notify('info', 'addFile')
    } catch {
      notify('error', 'addFile')
    }
  }

  async function handleEditFile(lessonId: number, fileId: number, formData: FormData): Promise<void> {
    try {
      const data = await editCourseLessonFile(courseId, lessonId, fileId, formData)
      if (isMounted)
        setLessons((previousValue) => {
          const value = deleteLessonsFile(previousValue, lessonId, fileId, false)
          return addFileToLessons(value, lessonId, data)
        })
      notify('info', 'editFile')
    } catch {
      notify('error', 'editFile')
    }
  }

  async function handleDeleteFile(lessonId: number, fileId: number): Promise<void> {
    try {
      await deleteCourseLessonFile(courseId, lessonId, fileId)
      if (isMounted) setLessons((previousValue) => deleteLessonsFile(previousValue, lessonId, fileId))
      notify('info', 'deleteFile')
    } catch {
      notify('error', 'deleteFile')
    }
  }

  async function handleCreateDeadline(lessonId: number, name: string, begin: string, end: string, description?: string): Promise<void> {
    try {
      const data = await createNewLessonDeadline(lessonId, name, begin, end, description)
      if (isMounted) setLessons((previousValue) => addDeadlineToLessons(previousValue, lessonId, data))
      notify('info', 'createDeadline')
    } catch {
      notify('error', 'createDeadline')
    }
  }

  async function handleEditDeadline(
    lessonId: number,
    deadlineId: number,
    name: string,
    begin: string,
    end: string,
    description?: string
  ): Promise<void> {
    try {
      const data = await editLessonDeadline(lessonId, deadlineId, name, begin, end, description)
      if (isMounted) setLessons((previousValue) => editLessonsDeadline(previousValue, lessonId, deadlineId, data))
      notify('info', 'editDeadline')
    } catch {
      notify('error', 'editDeadline')
    }
  }

  async function handleDeleteDeadline(lessonId: number, deadlineId: number): Promise<void> {
    try {
      await deleteLessonDeadline(lessonId, deadlineId)
      if (isMounted) setLessons((previousValue) => deleteLessonsDeadline(previousValue, lessonId, deadlineId))
      notify('info', 'deleteDeadline')
    } catch {
      notify('error', 'deleteDeadline')
    }
  }

  async function handleAddDeadlineFile(lessonId: number, deadlineId: number, formData: FormData): Promise<void> {
    try {
      const data = await addLessonDeadlineFile(lessonId, deadlineId, formData)
      if (isMounted) setLessons((previousValue) => addFileToLessonsDeadline(previousValue, lessonId, deadlineId, data))
      notify('info', 'addDeadlineFile')
    } catch {
      notify('error', 'addDeadlineFile')
    }
  }

  async function handleEditDeadlineFile(lessonId: number, deadlineId: number, fileId: number, formData: FormData): Promise<void> {
    try {
      const data = await editLessonDeadlineFile(lessonId, deadlineId, fileId, formData)
      if (isMounted)
        setLessons((previousValue) => {
          const value = deleteLessonsDeadlineFile(previousValue, lessonId, deadlineId, fileId, false)
          return addFileToLessonsDeadline(value, lessonId, deadlineId, data)
        })
      notify('info', 'editDeadlineFile')
    } catch {
      notify('error', 'editDeadlineFile')
    }
  }

  async function handleDeleteDeadlineFile(lessonId: number, deadlineId: number, fileId: number): Promise<void> {
    try {
      await deleteLessonDeadlineFile(lessonId, deadlineId, fileId)
      if (isMounted) setLessons((previousValue) => deleteLessonsDeadlineFile(previousValue, lessonId, deadlineId, fileId))
      notify('info', 'deleteDeadlineFile')
    } catch {
      notify('error', 'deleteDeadlineFile')
    }
  }

  if (isLoading || !user) {
    return <CardSkeleton cardNumber="4" />
  }

  if (!lessons || (lessons.length === 0 && !isInEditingMode)) {
    return (
      <Flex direction="column" alignItems="center" gridGap="0.5rem">
        <Text textAlign="center" fontSize="5rem">
          ≡(▔﹏▔)≡
        </Text>
        <Text textAlign="center" fontSize="2rem">
          {LL.course.noLessons()}
        </Text>
      </Flex>
    )
  }

  if (user?.role === 'lecturer') {
    return (
      <Box>
        <Flex direction="column" gridGap="0.5rem">
          {isInEditingMode && (
            <Tooltip label={LL.lesson.createNew()}>
              <Card as={Center} onClick={onOpen} variant="clickable">
                <Icon as={FiPlus} />
              </Card>
            </Tooltip>
          )}
          {lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              userRole={user?.role}
              isInEditingMode={isInEditingMode}
              onEditSubmit={handleEditLesson}
              onDeleteLesson={handleDeleteLesson}
              onAddFile={handleAddFile}
              onEditFile={handleEditFile}
              onDeleteFile={handleDeleteFile}
              onCreateDeadline={handleCreateDeadline}
              onEditDeadline={handleEditDeadline}
              onDeleteDeadline={handleDeleteDeadline}
              onAddDeadlineFile={handleAddDeadlineFile}
              onEditDeadlineFile={handleEditDeadlineFile}
              onDeleteDeadlineFile={handleDeleteDeadlineFile}
            />
          ))}
        </Flex>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleCreateLesson}>
            <ModalHeader>{LL.lesson.createNew()}</ModalHeader>
            <ModalCloseButton aria-label="Close create lesson" />
            <ModalBody as={Flex} flexDirection="column" gridGap="0.75rem">
              <FormControl isRequired>
                <FormLabel>{LL.lesson.name()}</FormLabel>
                <Input placeholder={LL.lesson.namePlaceholder()} ref={nameNewLessonInputRef} />
              </FormControl>

              <FormControl>
                <FormLabel>{LL.lesson.description()}</FormLabel>
                <Input placeholder={LL.lesson.descriptionPlaceholder()} ref={descriptionNewLessonInputRef} />
              </FormControl>
            </ModalBody>

            <ModalFooter as={Flex} gridGap="0.75rem">
              <Button aria-label="Cancel create lesson" onClick={onClose}>
                {LL.common.cancel()}
              </Button>
              <Button aria-label="Create lesson" isLoading={isNewLessonLoading} variant="accent" type="submit">
                {LL.common.create()}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    )
  }

  return (
    <Flex direction="column" gridGap="0.5rem">
      {lessons.map((lesson) => (
        <LessonItem key={lesson.id} lesson={lesson} />
      ))}
    </Flex>
  )
}

export default CourseLessons
