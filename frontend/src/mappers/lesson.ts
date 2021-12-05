import { fromLocationPayloads } from './location'
import { fromDeadlinesPayload } from './deadline'
import type { Lesson, LessonPayload } from '../models/lesson'

function fromLessonPayload({ id, name, description, file_lesson, deadline_lesson }: LessonPayload, courseId: number): Lesson {
  return {
    id,
    name,
    description,
    courseId,
    locationItems: fromLocationPayloads(file_lesson),
    deadlines: fromDeadlinesPayload(deadline_lesson, courseId)
  }
}

function fromLessonsPayload(lessonsPayload: LessonPayload[], courseId: number): Lesson[] {
  return lessonsPayload.map((lessonPayload) => fromLessonPayload(lessonPayload, courseId))
}

export { fromLessonPayload, fromLessonsPayload }
