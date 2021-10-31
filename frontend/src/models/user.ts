interface UserResponse {
  id: number
  code: string
  name: string
  gender: 'M' | 'W'
  email: string
  image: string
  is_lecturer: boolean
}

interface User {
  id: number
  code: string
  name: string
  role: 'student' | 'lecturer'
  gender: 'man' | 'woman'
  email: string
  imageUrl: string
}

class Student implements User {
  id: number
  code: string
  name: string
  role: 'student' | 'lecturer'
  gender: 'man' | 'woman'
  email: string
  imageUrl: string

  constructor(
    id: number,
    code: string,
    name: string,
    gender: 'man' | 'woman',
    email: string,
    imageUrl: string,
  ) {
    this.id = id
    this.code = code
    this.name = name
    this.role = 'student'
    this.gender = gender
    this.email = email
    this.imageUrl = imageUrl
  }
}

class Lecturer implements User {
  id: number
  code: string
  name: string
  role: 'student' | 'lecturer'
  gender: 'man' | 'woman'
  email: string
  imageUrl: string

  constructor(
    id: number,
    code: string,
    name: string,
    gender: 'man' | 'woman',
    email: string,
    imageUrl: string,
  ) {
    this.id = id
    this.code = code
    this.name = name
    this.role = 'lecturer'
    this.gender = gender
    this.email = email
    this.imageUrl = imageUrl
  }
}

export { Lecturer, Student }
export type { User, UserResponse }
