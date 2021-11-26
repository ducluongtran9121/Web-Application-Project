import { fromLocationPayloads } from './location'
import { fromDeadlinePayloads } from './deadline'
import type { Lesson, LessonPayload } from '../models/lesson'

function fromLessonPayload({ id, name, description, file_lesson, deadline_lesson }: LessonPayload): Lesson {
  return {
    id,
    name,
    description,
    locationItems: fromLocationPayloads(file_lesson),
    deadlines: fromDeadlinePayloads(deadline_lesson)
  }
}

function fromLessonsPayload(lessonsPayload: LessonPayload[]): Lesson[] {
  return lessonsPayload.map((lessonPayload) => fromLessonPayload(lessonPayload))
}

export { fromLessonPayload, fromLessonsPayload }
