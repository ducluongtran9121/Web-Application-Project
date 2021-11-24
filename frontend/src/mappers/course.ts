import { fromUserPayload } from './user'
import type { Course, CoursePayload } from '../models/course'

function fromCoursePayload(courseResponse: CoursePayload): Course {
  return {
    id: courseResponse.id,
    code: courseResponse.mskh,
    name: courseResponse.name,
    description: courseResponse.description,
    lecturers: courseResponse.course_lecturer.map((user) => fromUserPayload(user))
  }
}

export { fromCoursePayload }
