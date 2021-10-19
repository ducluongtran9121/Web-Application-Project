import { Lecturer } from '.'

export interface FetchCourse {
  mskh: string
  name: string
  description: string
}

export interface Course {
  code: string
  name: string
  lecturers: Lecturer[]
}
