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
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import CardSkeleton from '../../components/CardSkeleton'
import LessonItem from '../../components/LessonItem'
import Card from '../../components/Card'
import type { Lesson } from '../../models'

function CourseLessons(): JSX.Element {
  const { user, getCourseLessons, createNewLesson, editCourseLesson, deleteCourseLesson } = useAuth()
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

  async function handleNewLessonSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()

    setNewLessonLoading(true)

    try {
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

  async function handleOnEditSubmit(lessonId: number, name: string, description: string): Promise<void> {
    try {
      await editCourseLesson(Number(courseId), lessonId, name, description)
      // eslint-disable-next-line no-empty
    } catch {}
  }

  async function handleDeleteLesson(lessonId: number): Promise<void> {
    try {
      await deleteCourseLesson(Number(courseId), lessonId)
      const newLessons = lessons?.filter((lesson) => lesson.id !== lessonId)
      setLessons(newLessons)
      toast({
        title: LL.lesson.deletedSuccessfully(),
        description: LL.common.success(),
        status: 'info',
        position: 'bottom-right',
        variant: 'subtle',
        isClosable: true
      })
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

  if (!lessons) {
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
            <Card as={Center} onClick={onOpen} variant="hoverable">
              <Icon as={FiPlus} />
            </Card>
          )}
          {lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              userRole={user?.role}
              isInEditingMode={isInEditingMode}
              onEditSubmit={handleOnEditSubmit}
              onDeleteLesson={handleDeleteLesson}
            />
          ))}
        </Flex>
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent as="form" onSubmit={handleNewLessonSubmit}>
            <ModalHeader>{LL.lesson.createNew()}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>{LL.lesson.name()}</FormLabel>
                <Input placeholder={LL.lesson.namePlaceholder()} ref={nameNewLessonInputRef} />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>{LL.lesson.description()}</FormLabel>
                <Input placeholder={LL.lesson.descriptionPlaceholder()} ref={descriptionNewLessonInputRef} />
              </FormControl>
            </ModalBody>

            <ModalFooter as={Flex} gridGap="0.75rem">
              <Button isLoading={isNewLessonLoading} variant="accent" type="submit">
                {LL.common.create()}
              </Button>
              <Button onClick={onClose}>{LL.common.cancel()}</Button>
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
