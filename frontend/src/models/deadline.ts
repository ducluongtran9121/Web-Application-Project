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

interface Deadline {
  id: number
  locationItems: LocationItem[]
  name: string
  description: string
  begin: Date
  end: Date
  lesson: number
}

export type { DeadlinePayload, Deadline }
