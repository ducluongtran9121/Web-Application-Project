import { fromLocationPayloads } from './location'
import { fromDeadlinePayloads } from './deadline'
import type { Lesson, LessonPayload } from '../models/lesson'

function fromLessonPayloads({ id, name, description, file_lesson, deadline_lesson }: LessonPayload): Lesson {
  const locationItems = fromLocationPayloads(file_lesson)
  const deadlines = fromDeadlinePayloads(deadline_lesson)

  for (const deadline of deadlines) {
    for (let i = 0; i < locationItems.length; i++) {
      const isExist = deadline.locationItems.some((item) => item.id === locationItems[i].id)
      if (isExist) locationItems.splice(i, 1)
    }
  }

  return {
    id,
    name,
    description,
    locationItems,
    deadlines
  }
}

export { fromLessonPayloads }
