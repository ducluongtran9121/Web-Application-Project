import { User, Lecturer } from '.'

export interface CourseResponse {
  mskh: string
  name: string
  description: string
  user: User[]
}

export interface Course {
  code: string
  name: string
  lecturers: Lecturer[]
}
