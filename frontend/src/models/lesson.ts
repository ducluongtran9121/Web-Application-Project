import type { LocationItem, LocationPayload } from './location'

interface LessonPayload {
  id: number
  name: string
  description: string
  file_lesson: LocationPayload[]
}

interface Lesson {
  id: number
  name: string
  description: string
  items: LocationItem[]
}

export type { Lesson, LessonPayload }
