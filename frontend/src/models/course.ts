import type { Lecturer, UserResponse } from './user'

interface CourseResponse {
  id: number
  mskh: string
  name: string
  description: string
  course_lecturer: UserResponse[]
}

interface Course {
  id: number
  code: string
  name: string
  description: string
  lecturers: Lecturer[]
}

export type { Course, CourseResponse }
