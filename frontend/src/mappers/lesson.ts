import { fromLocationPayloads } from './location'
import { fromDeadlinePayloads } from './deadline'
import type { Lesson, LessonPayload } from '../models/lesson'

function fromLessonPayloads({ id, name, description, file_lesson, deadline_lesson }: LessonPayload): Lesson {
  return {
    id,
    name,
    description,
    locationItems: fromLocationPayloads(file_lesson),
    deadlines: fromDeadlinePayloads(deadline_lesson)
  }
}

export { fromLessonPayloads }
