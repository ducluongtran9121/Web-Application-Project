import type { Deadline, DeadlinePayload } from './deadline'
import type { LocationItem, LocationPayload } from './location'

interface LessonPayload {
  id: number
  name: string
  description: string
  file_lesson: LocationPayload[]
  deadline_lesson: DeadlinePayload[]
}

interface Lesson {
  id: number
  name: string
  description: string
  locationItems: LocationItem[]
  deadlines: Deadline[]
}

export type { Lesson, LessonPayload }
