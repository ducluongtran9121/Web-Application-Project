import type { LocationItem, LocationResponse } from './location'

interface LessonResponse {
  id: number
  name: string
  description: string
  file_lesson: LocationResponse[]
}

interface Lesson {
  id: number
  name: string
  description: string
  items: LocationItem[]
}

export type { Lesson, LessonResponse }
