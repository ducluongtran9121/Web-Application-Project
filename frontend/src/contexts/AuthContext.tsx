import axios from 'axios'
import jwtDecode from 'jwt-decode'
import * as React from 'react'
import { useHistory } from 'react-router'

import type {
  Course,
  CourseResponse,
  Jwt,
  Lesson,
  LessonResponse,
  RefreshSessionPayLoad,
  SignInRequestPayload,
  SignInResponsePayload,
  Student,
  User,
  UserResponse,
} from '../models'

import { useLocalStorage } from '../hooks'
import {
  createContext,
  fromCourseResponseToCourse,
  fromLessonResponsesToLessons,
  fromUserResponseToUser,
  httpClient,
} from '../utils'

interface AuthProviderProps {
  user?: User
  pathNameInput: string
  accessToken: string
  refreshToken: string
  setPreviousPath: React.Dispatch<React.SetStateAction<string>>
  signIn: (payload: SignInRequestPayload) => Promise<void>
  getCurrentUserProfile(): Promise<void>
  getCurrentUserCourses(): Promise<Course[]>
  getCurrentUserCourse(courseId: number): Promise<Course>
  getCourseLessons(courseId: number): Promise<Lesson[]>
  getCourseStudents(courseId: number): Promise<Student[]>
  signOut(): Promise<void>
  checkTokenExpired(): Promise<boolean>
}

interface Props {
  children: React.ReactNode
}

const [useAuth, AuthContextProvider] = createContext<AuthProviderProps>()

function AuthProvider({ children }: Props): JSX.Element {
  const history = useHistory()

  const [user, setUser] = React.useState<User | undefined>(undefined)
  const [previousPath, setPreviousPath] = React.useState<string>('')

  // Note: Don't use this in a real app. I'm using this because this app is just a 🥔💩
  const [accessToken, setAccessToken] = useLocalStorage('access', '')
  const [refreshToken, setRefreshToken] = useLocalStorage('refresh', '')

  async function refreshSession(): Promise<string> {
    if (jwtDecode<Jwt>(accessToken).exp < Date.now() / 1000) {
      try {
        const { data } = await httpClient.post<RefreshSessionPayLoad>(
          '/account/refreshtoken/',
          {
            refresh: refreshToken,
          },
        )
        setAccessToken(data.access)
        return data.access
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) signOut()
        }
      }
    }
    return accessToken
  }

  async function signIn({
    email,
    password,
  }: SignInRequestPayload): Promise<void> {
    const signInResponse = await httpClient.post<SignInResponsePayload>(
      '/account/login/',
      {
        email,
        password,
      },
    )
    setAccessToken(signInResponse.data.access)
    setRefreshToken(signInResponse.data.refresh)

    if (previousPath !== '') {
      const path = previousPath
      setPreviousPath('')
      history.push(path)
    }
  }

  async function getCurrentUserProfile(): Promise<void> {
    const token = await refreshSession()

    const { data } = await httpClient.get<UserResponse>(`/account/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setUser(fromUserResponseToUser(data))
  }

  async function getCurrentUserCourses(): Promise<Course[]> {
    const token = await refreshSession()

    const { data } = await httpClient.get<CourseResponse[]>(
      `/courseAPI/courses/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return data.map((courseResponse) =>
      fromCourseResponseToCourse(courseResponse),
    )
  }

  async function getCurrentUserCourse(courseId: number): Promise<Course> {
    const token = await refreshSession()

    const { data } = await httpClient.get<CourseResponse>(
      `/courseAPI/courses/${courseId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return fromCourseResponseToCourse(data)
  }

  async function getCourseLessons(courseId: number): Promise<Lesson[]> {
    const token = await refreshSession()

    const { data } = await httpClient.get<LessonResponse[]>(
      `/courseAPI/courses/${courseId}/lessons/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return data.map((lesson) => fromLessonResponsesToLessons(lesson))
  }

  async function getCourseStudents(courseId: number): Promise<Student[]> {
    const token = await refreshSession()

    const { data } = await httpClient.get<UserResponse[]>(
      `/courseAPI/courses/${courseId}/listMember/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return data.map((student) => fromUserResponseToUser(student))
  }

  async function checkTokenExpired(): Promise<boolean> {
    try {
      if (jwtDecode<Jwt>(accessToken).exp < Date.now() / 1000) {
        await signOut()
        return true
      }
      return false
    } catch (err) {
      setAccessToken('')
      setRefreshToken('')
      return true
    }
  }

  async function signOut(): Promise<void> {
    try {
      await httpClient.post('/account/logout/', { refreshToken })
    } catch (err) {
    } finally {
      setAccessToken('')
      setRefreshToken('')
    }
  }

  const value: AuthProviderProps = {
    user,
    pathNameInput: previousPath,
    accessToken,
    refreshToken,
    setPreviousPath,
    signIn,
    getCurrentUserProfile,
    getCurrentUserCourses,
    getCurrentUserCourse,
    getCourseLessons,
    getCourseStudents,
    signOut,
    checkTokenExpired,
  }
  return <AuthContextProvider value={value}>{children}</AuthContextProvider>
}

export { useAuth }
export default AuthProvider
