import lodash from 'lodash'

import {
  Course,
  CourseResponse,
  File,
  Folder,
  Lesson,
  LessonResponse,
  LocationItem,
  LocationResponse,
  User,
  UserResponse,
} from '../models'
import { Lecturer, Student } from '../models'

const baseUrl = process.env.REACT_APP_API_URL

function fromUserResponseToUser(userResponse: UserResponse): User {
  if (
    userResponse.is_lecturer === true ||
    userResponse.is_lecturer === undefined
  ) {
    return new Lecturer(
      userResponse.id,
      userResponse.code,
      userResponse.name,
      userResponse.gender === 'M' ? 'man' : 'woman',
      userResponse.email,
      baseUrl + userResponse.image,
    )
  }

  return new Student(
    userResponse.id,
    userResponse.code,
    userResponse.name,
    userResponse.gender === 'M' ? 'man' : 'woman',
    userResponse.email,
    baseUrl + userResponse.image,
  )
}

function fromCourseResponseToCourse(courseResponse: CourseResponse): Course {
  return {
    id: courseResponse.id,
    code: courseResponse.mskh,
    name: courseResponse.name,
    description: courseResponse.description,
    lecturers: courseResponse.course_lecturer.map((user) =>
      fromUserResponseToUser(user),
    ),
  }
}

function fromLocationResponseToLocation(locationResponses: LocationResponse[]) {
  const locations: LocationItem[] = []
  const fileExtensionPattern = /\.[0-9a-z]+$/i

  const groupedFolder = lodash.groupBy(locationResponses, (i) => i.in_folder)

  for (let folderName in groupedFolder) {
    if (folderName === '') {
      groupedFolder[folderName].forEach((file) => {
        const match = file.file_upload.match(fileExtensionPattern)
        locations.push(
          new File(
            file.id,
            file.name,
            match ? match[0] : 'binary',
            baseUrl + file.file_upload,
          ),
        )
      })
    } else {
      const folder = new Folder(-1, folderName, '', [])
      groupedFolder[folderName].forEach((file) => {
        const match = file.file_upload.match(fileExtensionPattern)
        folder.children?.push(
          new File(
            file.id,
            file.name,
            match ? match[0] : 'binary',
            baseUrl + file.file_upload,
          ),
        )
      })
      locations.push(folder)
    }
  }
  return locations
}

function fromLessonResponsesToLessons(lessonResponse: LessonResponse): Lesson {
  return {
    id: lessonResponse.id,
    name: lessonResponse.name,
    description: lessonResponse.description,
    items: fromLocationResponseToLocation(lessonResponse.file_lesson),
  }
}

export {
  fromUserResponseToUser,
  fromCourseResponseToCourse,
  fromLessonResponsesToLessons,
}
