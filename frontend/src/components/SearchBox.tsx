import * as React from 'react'
import { I18nContext } from '../i18n/i18n-react'
import { Link as RouterLink } from 'react-router-dom'
import { Flex, Icon, Input, InputGroup, InputLeftElement, Link, Spinner, Text, useColorModeValue } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import Card from './Card'
import type { InputProps } from '@chakra-ui/react'
import type { Course, Deadline, Lesson, UserRole } from '../models'

interface SearchBoxProps extends InputProps {
  role?: UserRole
  courses?: Course[]
  lessons?: Lesson[]
  deadlines?: Deadline[]
  placeholder?: string
  isCoursesSpinnerLoading?: boolean
  isLessonsSpinnerLoading?: boolean
  isDeadlinesSpinnerLoading?: boolean
  onSearchBoxFocus?(): void
  onSearchBoxChange?(): void
  onSearchBoxBlur?(): void
}

function SearchBox({
  role,
  courses,
  lessons,
  deadlines,
  placeholder,
  isCoursesSpinnerLoading,
  isLessonsSpinnerLoading,
  isDeadlinesSpinnerLoading,
  onSearchBoxFocus,
  onSearchBoxChange,
  onSearchBoxBlur,
  ...rest
}: SearchBoxProps): JSX.Element {
  const { LL } = React.useContext(I18nContext)
  const [isOpen, setOpen] = React.useState<boolean>(false)
  const [value, setValue] = React.useState<string>('')
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [filteredCourses, setFilteredCourses] = React.useState<Course[]>()
  const [filteredLessons, setFilteredLessons] = React.useState<Lesson[]>()
  const [filteredDeadlines, setFilteredDeadlines] = React.useState<Deadline[]>()
  const textDefaultColor = useColorModeValue('light.text.default', 'dark.text.default')

  React.useEffect(() => {
    search(value)
    if (!isCoursesSpinnerLoading && onSearchBoxChange) onSearchBoxChange()
  }, [courses, lessons, deadlines, isCoursesSpinnerLoading])

  function search(value: string) {
    if (courses) {
      let filtered = courses.filter((course) => course.name.toLowerCase().includes(value.toLowerCase()))
      if (filtered.length > 4) filtered = filtered.slice(0, 3)
      setFilteredCourses(filtered)
    }
    if (lessons) {
      let filtered = lessons.filter((lesson) => lesson.name.toLowerCase().includes(value.toLowerCase()))
      if (filtered.length > 4) filtered = filtered.slice(0, 3)
      setFilteredLessons(filtered)
    }
    if (deadlines) {
      let filtered = deadlines.filter((deadline) => deadline.name.toLowerCase().includes(value.toLowerCase()))
      if (filtered.length > 4) filtered = filtered.slice(0, 3)
      setFilteredDeadlines(filtered)
    }
  }

  function handleFocus(): void {
    setOpen(true)
    if (onSearchBoxFocus) onSearchBoxFocus()
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    if (onSearchBoxChange) onSearchBoxChange()
    setValue(e.target.value)
    search(e.target.value)
  }

  function handleClose(): void {
    setOpen(false)
    if (onSearchBoxBlur) onSearchBoxBlur()
  }

  function handleClickLinkClose() {
    inputRef.current?.blur()
  }

  return (
    <>
      <InputGroup {...rest}>
        <InputLeftElement>
          <Icon as={FiSearch} />
        </InputLeftElement>
        <Input
          onBlur={handleClose}
          type="search"
          value={value}
          placeholder={placeholder}
          onFocus={handleFocus}
          onChange={handleChange}
          ref={inputRef}
        />
      </InputGroup>
      {isOpen && (
        <Flex position="absolute" direction="column" gridGap="0.5rem" zIndex="2" as={Card} variant="search" w="100%">
          <Text fontWeight="bold">{LL.common.courses()}</Text>
          <Flex direction="column" pl="0.5rem">
            {filteredCourses &&
              filteredCourses.map(({ id, name }) => (
                <Link
                  as={RouterLink}
                  key={id}
                  to={`courses/${id}`}
                  variant="search"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleClickLinkClose}
                >
                  {name}
                </Link>
              ))}
            {isCoursesSpinnerLoading && <Spinner alignSelf="center" />}
          </Flex>
          <Text fontWeight="bold">{LL.common.lessons()}</Text>
          <Flex direction="column">
            {filteredLessons &&
              filteredLessons.map(({ id, name, courseId, courseName }) => (
                <Link
                  as={RouterLink}
                  key={id}
                  to={`courses/${courseId}`}
                  variant="search"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleClickLinkClose}
                >
                  <Text>{name}</Text>
                  <Text color={textDefaultColor} fontSize="0.85rem" fontWeight="normal">
                    {courseName}
                  </Text>
                </Link>
              ))}
            {isLessonsSpinnerLoading && <Spinner alignSelf="center" />}
          </Flex>
          <Text fontWeight="bold">{LL.common.deadlines()}</Text>
          <Flex direction="column">
            {filteredDeadlines &&
              filteredDeadlines.map(({ id, name, courseId, lessonId, submitId, courseName, lessonName }) =>
                role === 'lecturer' ? (
                  <Link
                    as={RouterLink}
                    key={id}
                    variant="search"
                    to={`courses/${courseId}/lessons/${lessonId}/deadlines/${id}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleClickLinkClose}
                  >
                    <Text>{name}</Text>
                    <Text color={textDefaultColor} fontSize="0.85rem" fontWeight="normal">
                      <Text as="span">{courseName}</Text>
                      <Text as="span">{' > '}</Text>
                      <Text as="span">{lessonName}</Text>
                    </Text>
                  </Link>
                ) : (
                  <Link
                    as={RouterLink}
                    key={id}
                    variant="search"
                    to={`courses/${courseId}/lessons/${lessonId}/submitdeadline/${submitId}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleClickLinkClose}
                  >
                    <Text>{name}</Text>
                    <Text color={textDefaultColor} fontSize="0.85rem" fontWeight="normal">
                      <Text as="span">{courseName}</Text>
                      <Text as="span">{' > '}</Text>
                      <Text as="span">{lessonName}</Text>
                    </Text>
                  </Link>
                )
              )}
            {isDeadlinesSpinnerLoading && <Spinner alignSelf="center" />}
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default SearchBox
