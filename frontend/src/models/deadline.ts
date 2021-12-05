import type { User, UserPayload } from './user'
import type { LocationPayload, LocationItem } from './location'

interface DeadlinePayload {
  id: number
  file_deadline_lesson: LocationPayload[]
  name: string
  description: string
  begin: string
  end: string
  lesson: number
}

interface DeadlineSubmitPayload {
  id: number
  is_finished: boolean
  finish_at?: string
  file_deadlineSubmit_lesson: LocationPayload[]
  deadline: DeadlinePayload
}

interface DeadlineStatusPayload {
  id: number
  is_finished: boolean
  finish_at?: string
  file_deadlineSubmit_lesson: LocationPayload[]
  member: UserPayload
}

interface DeadlineStatus {
  id: number
  isFinished: boolean
  finishAt?: Date
  submitItems: LocationItem[]
  member: User
}

interface Deadline {
  id: number
  locationItems: LocationItem[]
  name: string
  description: string
  begin: Date
  end: Date
  lessonId: number
  courseId?: number
  courseName?: string
  lessonName?: string
  isFinished?: boolean
  submitId?: number
  submitItems?: LocationItem[]
  finishAt?: Date
}

export type { DeadlinePayload, DeadlineSubmitPayload, DeadlineStatusPayload, Deadline, DeadlineStatus }
