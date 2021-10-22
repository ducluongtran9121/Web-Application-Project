export interface UserResponse {
  id: number
  code: string
  name: string
  gender: 'M' | 'W'
  email: string
  image: string
  is_lecturer: boolean
}

export interface User {
  id: number
  code: string
  name: string
  role: 'student' | 'lecture'
  gender: 'men' | 'women'
  email: string
  imageUrl: string
}

export class Student implements User {
  id: number
  code: string
  name: string
  role: 'student' | 'lecture'
  gender: 'men' | 'women'
  email: string
  imageUrl: string

  constructor(
    id: number,
    code: string,
    name: string,
    gender: 'men' | 'women',
    email: string,
    imageUrl: string
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

export class Lecturer implements User {
  id: number
  code: string
  name: string
  role: 'student' | 'lecture'
  gender: 'men' | 'women'
  email: string
  imageUrl: string

  constructor(
    id: number,
    code: string,
    name: string,
    gender: 'men' | 'women',
    email: string,
    imageUrl: string
  ) {
    this.id = id
    this.code = code
    this.name = name
    this.role = 'lecture'
    this.gender = gender
    this.email = email
    this.imageUrl = imageUrl
  }
}
