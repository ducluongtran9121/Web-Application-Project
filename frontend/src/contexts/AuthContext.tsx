import * as React from 'react'
import Constants from '../constants'
import {
  fromUserPayload,
  fromCoursePayload,
  fromLessonPayload,
  fromLessonsPayload,
  fromUserPayloads,
  fromCoursesPayload,
  fromLocationPayLoadToFile
} from '../mappers'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../utils'
import { createContext, TokenStorage } from '../helpers'

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
  UserPayload
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
}

const [useAuth, AuthContextProvider] = createContext<AuthContextProviderProps>()

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = React.useState<User>()
  const navigate = useNavigate()

  async function signIn({ email, password }: SignInRequestPayload, callback?: VoidFunction): Promise<void> {
    const signInResponse = await axiosInstance.post<SignInResponsePayload>(Constants.Api.SignIn, {
      email,
      password
    })

    TokenStorage.storeTokens(signInResponse.data)

    if (callback) callback()
  }

  async function signOut(): Promise<void> {
    try {
      const refresh = TokenStorage.getToken('refresh')
      await axiosInstance.post(Constants.Api.SignOut, { refresh })
    } catch (err) {
      Promise.reject(err)
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
    const { data } = await axiosInstance.get<LessonPayload[]>(Constants.Api.CourseLessons(courseId))
    return fromLessonsPayload(data)
  }

  async function getCourseStudents(courseId: number): Promise<Student[]> {
    const { data } = await axiosInstance.get<UserPayload[]>(Constants.Api.CourseMembers(courseId))
    return fromUserPayloads(data)
  }

  async function createNewLesson(courseId: number, name?: string, description?: string): Promise<Lesson> {
    const { data } = await axiosInstance.post<LessonPayload>(Constants.Api.CourseLessons(courseId), { name, description })
    return fromLessonPayload(data)
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
    deleteCourseLessonFile
  }

  return <AuthContextProvider value={value}>{children}</AuthContextProvider>
}

export default AuthProvider
export { useAuth }
