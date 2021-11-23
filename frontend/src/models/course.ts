import type { Lecturer, UserPayload } from './user'

interface CoursePayload {
  id: number
  mskh: string
  name: string
  description: string
  course_lecturer: UserPayload[]
}

interface Course {
  id: number
  code: string
  name: string
  description: string
  lecturers: Lecturer[]
}

export type { Course, CoursePayload }
