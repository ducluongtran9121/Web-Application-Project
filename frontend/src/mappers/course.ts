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

function fromCoursesPayload(coursesPayload: CoursePayload[]): Course[] {
  return coursesPayload.map((coursePayload) => fromCoursePayload(coursePayload))
}

export { fromCoursePayload, fromCoursesPayload }
