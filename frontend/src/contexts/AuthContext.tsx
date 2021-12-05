import * as React from 'react'
import axios from 'axios'
import { useNotification } from './NotificationContext'
import Constants from '../constants'
import {
  fromUserPayload,
  fromCoursePayload,
  fromLessonPayload,
  fromLessonsPayload,
  fromUserPayloads,
  fromCoursesPayload,
  fromLocationPayLoadToFile,
  fromDeadlinesPayload,
  fromDeadlinePayload,
  fromDeadlineSubmitsPayload,
  fromDeadlineSubmitPayload,
  fromDeadlinesStatusPayloadToDeadlineStatus
} from '../mappers'
import { useLocation, useNavigate } from 'react-router-dom'
import { createContext, TokenStorage } from '../helpers'
import type { AxiosError } from 'axios'
import type {
  Course,
  CoursePayload,
  Lesson,
  LessonPayload,
  File,
  SignInRequestPayload,
  SignInResponsePayload,
  Student,
  User,
  UserPayload,
  Deadline,
  DeadlinePayload,
  RefreshSessionPayLoad,
  ErrorResponsePayload,
  DeadlineSubmitPayload,
  DeadlineStatus
} from '../models'

interface AuthProviderProps {
  children: JSX.Element
}

interface AuthContextProviderProps {
  user?: User
  signIn: (payload: SignInRequestPayload, callback?: VoidFunction) => Promise<void>
  signOut(): Promise<void>
  getUserProfile(): Promise<void>
  getUserCourses(): Promise<Course[]>
  getUserCourse(courseId: number): Promise<Course>
  getCourseLessons(courseId: number): Promise<Lesson[]>
  getCourseStudents(courseId: number): Promise<Student[]>
  createNewLesson(courseId: number, name: string, description: string): Promise<Lesson>
  editCourseLesson(courseId: number, lessonId: number, name: string, description: string): Promise<void>
  deleteCourseLesson(courseId: number, lessonId: number): Promise<void>
  addCourseLessonFile(courseId: number, lessonId: number, formData: FormData): Promise<File>
  editCourseLessonFile(courseId: number, lessonId: number, fileId: number, formData: FormData): Promise<File>
  deleteCourseLessonFile(courseId: number, lessonId: number, fileId: number): Promise<void>
  getStudentDeadlines(): Promise<Deadline[]>
  createNewLessonDeadline(lessonId: number, name: string, begin: string, end: string, description?: string): Promise<Deadline>
  editLessonDeadline(lessonId: number, deadlineId: number, name: string, begin: string, end: string, description?: string): Promise<Deadline>
  deleteLessonDeadline(lessonId: number, deadlineId: number): Promise<void>
  addLessonDeadlineFile(lessonId: number, deadlineId: number, formData: FormData): Promise<File>
  editLessonDeadlineFile(lessonId: number, deadlineId: number, fileId: number, formData: FormData): Promise<File>
  deleteLessonDeadlineFile(lessonId: number, deadlineId: number, fileId: number): Promise<void>
  getStudentDeadlineSubmits(lessonId: number): Promise<Deadline[]>
  getStudentDeadlineSubmit(lessonId: number, submitId: number): Promise<Deadline>
  submitStudentDeadline(lessonId: number, submitId: number): Promise<Deadline>
  unsubmitStudentDeadline(lessonId: number, submitId: number): Promise<Deadline>
  addStudentDeadlineFile(lessonId: number, submitId: number, formData: FormData): Promise<File>
  editStudentDeadlineFile(lessonId: number, submitId: number, fileId: number, formData: FormData): Promise<File>
  deleteStudentDeadlineFile(lessonId: number, submitId: number, fileId: number): Promise<void>
  listStudentsDeadlineStatus(lessonId: number, deadlineId: number): Promise<DeadlineStatus[]>
  getLecturerDeadline(lessonId: number, deadlineId: number): Promise<Deadline>
  getLecturerDeadlines(lessonId: number): Promise<Deadline[]>
}

const [useAuth, AuthContextProvider] = createContext<AuthContextProviderProps>()

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const { notify } = useNotification()
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = React.useState<User>()
  const [isTokenError, setTokenError] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (isTokenError) notify('error', 'tokenExpired')
  }, [isTokenError])

  const axiosInstance = axios.create({
    baseURL: Constants.Api.Base
  })

  axiosInstance.interceptors.request.use((request) => {
    const accessToken = TokenStorage.getToken('access')
    if (request.headers) request.headers['Authorization'] = `Bearer ${accessToken}`
    return request
  })

  axiosInstance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error: AxiosError<ErrorResponsePayload>) => {
      // Not token expired error then reject
      if (
        error.response?.status !== 401 ||
        error.config.url === Constants.Api.RefreshToken ||
        error.response?.data.detail === Constants.Error.NoActiveAccount
      ) {
        return new Promise((_, reject) => reject(error))
      }

      try {
        // Get new access token
        const refreshToken = TokenStorage.getToken('refresh')
        const { data } = await axios.post<RefreshSessionPayLoad>(`${Constants.Api.Base}${Constants.Api.RefreshToken}`, { refresh: refreshToken })

        TokenStorage.storeToken('access', data.access)

        // Resend request
        const config = error.config
        if (config.headers) config.headers['Authorization'] = `Bearer ${data.access}`

        return new Promise((resolve, reject) => {
          axios
            .request(config)
            .then((response) => resolve(response))
            .catch((error) => reject(error))
        })
      } catch (error) {
        if (axios.isAxiosError(error) && (error.response?.status === 401 || !TokenStorage.getToken('refresh'))) {
          setTokenError(true)
          TokenStorage.removeTokens()
          navigate('/signin', { state: { from: location }, replace: true })
        } else Promise.reject(error)
      }
    }
  )

  async function signIn({ email, password }: SignInRequestPayload, callback?: VoidFunction): Promise<void> {
    const signInResponse = await axiosInstance.post<SignInResponsePayload>(Constants.Api.SignIn, {
      email,
      password
    })

    TokenStorage.storeTokens(signInResponse.data)
    setTokenError(false)

    if (callback) callback()
  }

  async function signOut(): Promise<void> {
    try {
      const refresh = TokenStorage.getToken('refresh')
      await axiosInstance.post(Constants.Api.SignOut, { refresh })
    } catch (err) {
      //
    } finally {
      navigate('/signin', { replace: true })
      TokenStorage.removeTokens()
    }
  }

  async function getUserProfile(): Promise<void> {
    const { data } = await axiosInstance.get<UserPayload>(Constants.Api.UserProfile)
    setUser(fromUserPayload(data))
  }

  async function getUserCourses(): Promise<Course[]> {
    const { data } = await axiosInstance.get<CoursePayload[]>(Constants.Api.Courses)
    return fromCoursesPayload(data)
  }

  async function getUserCourse(courseId: number): Promise<Course> {
    const { data } = await axiosInstance.get<CoursePayload>(Constants.Api.Course(courseId))
    return fromCoursePayload(data)
  }

  async function getCourseLessons(courseId: number): Promise<Lesson[]> {
    if (!user) return []
    const { data } = await axiosInstance.get<LessonPayload[]>(Constants.Api.CourseLessons(courseId))
    const lessons = fromLessonsPayload(data, courseId)
    if (user?.role === 'lecturer') return lessons

    const arr: Promise<Deadline[]>[] = []
    for (const lesson of data) {
      const promise = getStudentDeadlineSubmits(lesson.id)
      arr.push(promise)
    }
    const deadlinesArr = await Promise.all(arr)

    for (let i = 0; i < deadlinesArr.length; i++) {
      const tempDeadlines = lessons[i].deadlines
      for (let j = 0; j < tempDeadlines.length; j++) {
        deadlinesArr[i][j].locationItems = tempDeadlines[j].locationItems
        deadlinesArr[i][j].courseId = courseId
      }
      lessons[i].deadlines = deadlinesArr[i]
    }

    return lessons
  }

  async function getCourseStudents(courseId: number): Promise<Student[]> {
    const { data } = await axiosInstance.get<UserPayload[]>(Constants.Api.CourseMembers(courseId))
    return fromUserPayloads(data)
  }

  async function createNewLesson(courseId: number, name?: string, description?: string): Promise<Lesson> {
    const { data } = await axiosInstance.post<LessonPayload>(Constants.Api.CourseLessons(courseId), { name, description })
    return fromLessonPayload(data, courseId)
  }

  async function editCourseLesson(courseId: number, lessonId: number, name: string, description: string): Promise<void> {
    await axiosInstance.put(Constants.Api.CourseLesson(courseId, lessonId), { name, description })
  }

  async function deleteCourseLesson(courseId: number, lessonId: number): Promise<void> {
    await axiosInstance.delete(Constants.Api.CourseLesson(courseId, lessonId))
  }

  async function addCourseLessonFile(courseId: number, lessonId: number, formData: FormData): Promise<File> {
    const { data } = await axiosInstance.post(Constants.Api.CourseLessonFiles(courseId, lessonId), formData)
    return fromLocationPayLoadToFile(data)
  }

  async function editCourseLessonFile(courseId: number, lessonId: number, fileId: number, formData: FormData): Promise<File> {
    const { data } = await axiosInstance.put(Constants.Api.CourseLessonFile(courseId, lessonId, fileId), formData)
    return fromLocationPayLoadToFile(data)
  }

  async function deleteCourseLessonFile(courseId: number, lessonId: number, fileId: number): Promise<void> {
    await axiosInstance.delete(Constants.Api.CourseLessonFile(courseId, lessonId, fileId))
  }

  async function getStudentDeadlines(): Promise<Deadline[]> {
    const { data } = await axiosInstance.get<DeadlinePayload[]>(Constants.Api.StudentDeadlines)
    return fromDeadlinesPayload(data)
  }

  async function createNewLessonDeadline(lessonId: number, name: string, begin: string, end: string, description?: string): Promise<Deadline> {
    const { data } = await axiosInstance.post<DeadlinePayload>(Constants.Api.LecturerDeadlines(lessonId), { name, description, begin, end })
    return fromDeadlinePayload(data)
  }

  async function editLessonDeadline(
    lessonId: number,
    deadlineId: number,
    name: string,
    begin: string,
    end: string,
    description?: string
  ): Promise<Deadline> {
    const { data } = await axiosInstance.put<DeadlinePayload>(Constants.Api.LecturerDeadline(lessonId, deadlineId), { name, description, begin, end })
    return fromDeadlinePayload(data)
  }

  async function deleteLessonDeadline(lessonId: number, deadlineId: number): Promise<void> {
    await axiosInstance.delete(Constants.Api.LecturerDeadline(lessonId, deadlineId))
  }

  async function addLessonDeadlineFile(lessonId: number, deadlineId: number, formData: FormData): Promise<File> {
    const { data } = await axiosInstance.post(Constants.Api.LecturerDeadlineFiles(lessonId, deadlineId), formData)
    return fromLocationPayLoadToFile(data)
  }

  async function editLessonDeadlineFile(lessonId: number, deadlineId: number, fileId: number, formData: FormData): Promise<File> {
    const { data } = await axiosInstance.put(Constants.Api.LecturerDeadlineFile(lessonId, deadlineId, fileId), formData)
    return fromLocationPayLoadToFile(data)
  }

  async function deleteLessonDeadlineFile(lessonId: number, deadlineId: number, fileId: number): Promise<void> {
    await axiosInstance.delete(Constants.Api.LecturerDeadlineFile(lessonId, deadlineId, fileId))
  }

  async function getStudentDeadlineSubmits(lessonId: number): Promise<Deadline[]> {
    const { data } = await axiosInstance.get<DeadlineSubmitPayload[]>(Constants.Api.StudentLessonDeadlines(lessonId))
    return fromDeadlineSubmitsPayload(data)
  }

  async function getStudentDeadlineSubmit(lessonId: number, submitId: number): Promise<Deadline> {
    const { data } = await axiosInstance.get<DeadlineSubmitPayload>(Constants.Api.StudentLessonDeadline(lessonId, submitId))
    return fromDeadlineSubmitPayload(data)
  }
  async function submitStudentDeadline(lessonId: number, submitId: number): Promise<Deadline> {
    const { data } = await axiosInstance.put<DeadlineSubmitPayload>(Constants.Api.StudentLessonDeadlineSubmit(lessonId, submitId))
    return fromDeadlineSubmitPayload(data)
  }

  async function unsubmitStudentDeadline(lessonId: number, submitId: number): Promise<Deadline> {
    const { data } = await axiosInstance.put<DeadlineSubmitPayload>(Constants.Api.StudentLessonDeadlineUnsubmit(lessonId, submitId))
    return fromDeadlineSubmitPayload(data)
  }

  async function addStudentDeadlineFile(lessonId: number, submitId: number, formData: FormData): Promise<File> {
    const { data } = await axiosInstance.post(Constants.Api.StudentLessonDeadlineFiles(lessonId, submitId), formData)
    return fromLocationPayLoadToFile(data)
  }

  async function editStudentDeadlineFile(lessonId: number, submitId: number, fileId: number, formData: FormData): Promise<File> {
    const { data } = await axiosInstance.put(Constants.Api.StudentLessonDeadlineFile(lessonId, submitId, fileId), formData)
    return fromLocationPayLoadToFile(data)
  }

  async function deleteStudentDeadlineFile(lessonId: number, submitId: number, fileId: number): Promise<void> {
    await axiosInstance.delete(Constants.Api.StudentLessonDeadlineFile(lessonId, submitId, fileId))
  }

  async function getLecturerDeadlines(lessonId: number): Promise<Deadline[]> {
    const { data } = await axiosInstance.get(Constants.Api.LecturerDeadlines(lessonId))
    return fromDeadlinesPayload(data)
  }

  async function getLecturerDeadline(lessonId: number, deadlineId: number): Promise<Deadline> {
    const { data } = await axiosInstance.get(Constants.Api.LecturerDeadline(lessonId, deadlineId))
    return fromDeadlinePayload(data)
  }

  async function listStudentsDeadlineStatus(lessonId: number, deadlineId: number): Promise<DeadlineStatus[]> {
    const { data } = await axiosInstance.get(Constants.Api.LecturerDeadlinesStatus(lessonId, deadlineId))
    return fromDeadlinesStatusPayloadToDeadlineStatus(data)
  }

  const value: AuthContextProviderProps = {
    user,
    signIn,
    signOut,
    getUserProfile,
    getUserCourses,
    getUserCourse,
    getCourseLessons,
    getCourseStudents,
    createNewLesson,
    editCourseLesson,
    deleteCourseLesson,
    addCourseLessonFile,
    editCourseLessonFile,
    deleteCourseLessonFile,
    getStudentDeadlines,
    createNewLessonDeadline,
    editLessonDeadline,
    deleteLessonDeadline,
    addLessonDeadlineFile,
    editLessonDeadlineFile,
    deleteLessonDeadlineFile,
    getStudentDeadlineSubmits,
    getStudentDeadlineSubmit,
    submitStudentDeadline,
    unsubmitStudentDeadline,
    addStudentDeadlineFile,
    editStudentDeadlineFile,
    deleteStudentDeadlineFile,
    listStudentsDeadlineStatus,
    getLecturerDeadlines,
    getLecturerDeadline
  }

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>
}

export default AuthProvider
export { useAuth }
