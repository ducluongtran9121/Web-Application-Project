import Constants from '../contants'
import { Lecturer, Student } from '../models/user'
import type { User, UserPayload } from '../models/user'

function fromUserPayload(userResponse: UserPayload): User {
  if (userResponse.is_lecturer === true || userResponse.is_lecturer === undefined) {
    return new Lecturer(
      userResponse.id,
      userResponse.code,
      userResponse.name,
      userResponse.gender === 'M' ? 'man' : 'woman',
      userResponse.email,
      Constants.Api.Base + userResponse.image
    )
  }

  return new Student(
    userResponse.id,
    userResponse.code,
    userResponse.name,
    userResponse.gender === 'M' ? 'man' : 'woman',
    userResponse.email,
    Constants.Api.Base + userResponse.image
  )
}

export { fromUserPayload }
