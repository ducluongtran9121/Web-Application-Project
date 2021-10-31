interface Jwt {
  token_type: string
  exp: number
  iat: number
  jti: string
  user_id: number
}

export type { Jwt }
