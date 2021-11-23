import { fromLocationPayload } from './location'
import type { Lesson, LessonPayload } from '../models/lesson'

function fromLessonPayloads(lessonResponse: LessonPayload): Lesson {
  return {
    id: lessonResponse.id,
    name: lessonResponse.name,
    description: lessonResponse.description,
    items: fromLocationPayload(lessonResponse.file_lesson)
  }
}

export { fromLessonPayloads }
