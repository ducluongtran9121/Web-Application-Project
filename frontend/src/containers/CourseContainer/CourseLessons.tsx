import * as React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useEdit } from '../../contexts/EditContext'
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
  useDisclosure,
  useToast
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
  const { courseId } = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const nameNewLessonInputRef = React.useRef<HTMLInputElement>(null)
  const descriptionNewLessonInputRef = React.useRef<HTMLInputElement>(null)
  const [isLoading, setLoading] = React.useState<boolean>(true)
  const [isNewLessonLoading, setNewLessonLoading] = React.useState<boolean>(false)
  const [lessons, setLessons] = React.useState<Lesson[]>()

  async function handleCreateLesson(e: React.FormEvent): Promise<void> {
    e.preventDefault()

    setNewLessonLoading(true)

    try {
      if (nameNewLessonInputRef.current && descriptionNewLessonInputRef.current) {
        const data = await createNewLesson(Number(courseId), nameNewLessonInputRef.current?.value, descriptionNewLessonInputRef.current?.value)
        const currentLessons = lessons
        currentLessons?.push(data)
        setLessons(currentLessons)
        toast({
          title: LL.lesson.createdSuccessfully(),
          description: LL.common.success(),
          status: 'info',
          position: 'bottom-right',
          variant: 'subtle',
          isClosable: true
        })
      } else throw 'Invalid Data'
    } catch {
      toast({
        title: LL.lesson.createdFailed(),
        description: LL.common.fail(),
        status: 'error',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    }

    setNewLessonLoading(false)
  }

  async function handleEditSubmit(lessonId: number, name: string, description: string): Promise<void> {
    try {
      await editCourseLesson(Number(courseId), lessonId, name, description)
      // eslint-disable-next-line no-empty
    } catch {}
  }

  async function handleDeleteLesson(lessonId: number): Promise<void> {
    try {
      if (lessons) {
        await deleteCourseLesson(Number(courseId), lessonId)
        const newLessons = lessons.filter((lesson) => lesson.id !== lessonId)
        setLessons(newLessons)
        toast({
          title: LL.lesson.deletedSuccessfully(),
          description: LL.common.success(),
          status: 'info',
          position: 'bottom-right',
          variant: 'subtle',
          isClosable: true
        })
      } else throw 'Invalid data'
    } catch {
      toast({
        title: LL.lesson.deletedFailed(),
        description: LL.common.fail(),
        status: 'error',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    }
  }

  async function handleAddFile(lessonId: number, formData: FormData) {
    try {
      if (lessons) {
        const data = await addCourseLessonFile(Number(courseId), lessonId, formData)
        setLessons((previousValue) => addFileToLessons(previousValue, lessonId, data))

        toast({
          title: LL.lesson.addedFileSuccessfully(),
          description: LL.common.success(),
          status: 'info',
          position: 'bottom-right',
          variant: 'subtle',
          isClosable: true
        })
      } else throw 'Invalid Data'
    } catch {
      toast({
        title: LL.lesson.addedFileFailed(),
        description: LL.common.fail(),
        status: 'error',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    }
  }

  async function handleEditFile(lessonId: number, fileId: number, formData: FormData): Promise<void> {
    try {
      if (lessons) {
        const data = await editCourseLessonFile(Number(courseId), lessonId, fileId, formData)
        const newLessons = deleteLessonsFile(lessons, lessonId, fileId, false)
        setLessons(addFileToLessons(newLessons, lessonId, data))

        toast({
          title: LL.lesson.editedFileSuccessfully(),
          description: LL.common.success(),
          status: 'info',
          position: 'bottom-right',
          variant: 'subtle',
          isClosable: true
        })
      }
    } catch {
      toast({
        title: LL.lesson.editedFileFailed(),
        description: LL.common.fail(),
        status: 'error',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    }
  }

  async function handleDeleteFile(lessonId: number, fileId: number): Promise<void> {
    try {
      if (lessons) {
        await deleteCourseLessonFile(Number(courseId), lessonId, fileId)
        setLessons((previousValue) => deleteLessonsFile(previousValue, lessonId, fileId))

        toast({
          title: LL.lesson.deletedFileSuccessfully(),
          description: LL.common.success(),
          status: 'info',
          position: 'bottom-right',
          variant: 'subtle',
          isClosable: true
        })
      } else throw 'Invalid data'
    } catch {
      toast({
        title: LL.lesson.deletedFileFailed(),
        description: LL.common.fail(),
        status: 'error',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    }
  }

  async function handleCreateDeadline(lessonId: number, name: string, begin: string, end: string, description?: string): Promise<void> {
    try {
      const data = await createNewLessonDeadline(lessonId, name, begin, end, description)
      setLessons(addDeadlineToLessons(lessons, lessonId, data))

      toast({
        title: LL.lesson.createdDeadlineSuccessfully(),
        description: LL.common.success(),
        status: 'info',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    } catch {
      toast({
        title: LL.lesson.createdDeadlineFailed(),
        description: LL.common.fail(),
        status: 'error',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
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
      setLessons(editLessonsDeadline(lessons, lessonId, deadlineId, data))

      toast({
        title: LL.lesson.editedDeadlineSuccessfully(),
        description: LL.common.success(),
        status: 'info',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    } catch {
      toast({
        title: LL.lesson.editedDeadlineFailed(),
        description: LL.common.fail(),
        status: 'error',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    }
  }

  async function handleDeleteDeadline(lessonId: number, deadlineId: number): Promise<void> {
    try {
      await deleteLessonDeadline(lessonId, deadlineId)
      setLessons(deleteLessonsDeadline(lessons, lessonId, deadlineId))

      toast({
        title: LL.lesson.deletedDeadlineSuccessfully(),
        description: LL.common.success(),
        status: 'info',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    } catch {
      toast({
        title: LL.lesson.deletedDeadlineFailed(),
        description: LL.common.fail(),
        status: 'error',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    }
  }

  async function handleAddDeadlineFile(lessonId: number, deadlineId: number, formData: FormData): Promise<void> {
    try {
      const data = await addLessonDeadlineFile(lessonId, deadlineId, formData)
      setLessons(addFileToLessonsDeadline(lessons, lessonId, deadlineId, data))

      toast({
        title: LL.lesson.addedDeadlineFileSuccessfully(),
        description: LL.common.success(),
        status: 'info',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    } catch {
      toast({
        title: LL.lesson.addedDeadlineFileFailed(),
        description: LL.common.fail(),
        status: 'error',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    }
  }

  async function handleEditDeadlineFile(lessonId: number, deadlineId: number, fileId: number, formData: FormData): Promise<void> {
    try {
      const data = await editLessonDeadlineFile(lessonId, deadlineId, fileId, formData)
      const newLessons = deleteLessonsDeadlineFile(lessons, lessonId, deadlineId, fileId, false)
      setLessons(addFileToLessonsDeadline(newLessons, lessonId, deadlineId, data))

      toast({
        title: LL.lesson.editedDeadlineFileSuccessfully(),
        description: LL.common.success(),
        status: 'info',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    } catch {
      toast({
        title: LL.lesson.editedDeadlineFileFailed(),
        description: LL.common.fail(),
        status: 'error',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    }
  }

  async function handleDeleteDeadlineFile(lessonId: number, deadlineId: number, fileId: number): Promise<void> {
    try {
      await deleteLessonDeadlineFile(lessonId, deadlineId, fileId)
      setLessons(deleteLessonsDeadlineFile(lessons, lessonId, deadlineId, fileId))

      toast({
        title: LL.lesson.deletedDeadlineFileSuccessfully(),
        description: LL.common.success(),
        status: 'info',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    } catch {
      toast({
        title: LL.lesson.deletedDeadlineFileFailed(),
        description: LL.common.fail(),
        status: 'error',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
    }
  }

  React.useEffect(() => {
    async function getData(): Promise<void> {
      setLoading(true)

      try {
        const data = await getCourseLessons(Number(courseId))
        setLessons(data)
        // eslint-disable-next-line no-empty
      } catch {}

      setLoading(false)
    }
    getData()
  }, [])

  if (isLoading) {
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
              onEditSubmit={handleEditSubmit}
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
            <ModalCloseButton />
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
              <Button onClick={onClose}>{LL.common.cancel()}</Button>
              <Button isLoading={isNewLessonLoading} variant="accent" type="submit">
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
