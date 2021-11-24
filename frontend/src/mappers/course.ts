import { fromUserPayloads } from './user'
import type { Course, CoursePayload } from '../models/course'

function fromCoursePayload({ id, mskh, name, description, course_lecturer }: CoursePayload): Course {
  return {
    id,
    name,
    description,
    code: mskh,
    lecturers: fromUserPayloads(course_lecturer)
  }
}

export { fromCoursePayload }
