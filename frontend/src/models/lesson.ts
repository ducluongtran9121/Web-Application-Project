import type { LocationItem, LocationResponse } from './location'

interface LessonResponse {
  id: number
  name: string
  file_lesson: LocationResponse[]
}

interface Lesson {
  id: number
  name: string
  items: LocationItem[]
}

export type { Lesson, LessonResponse }
