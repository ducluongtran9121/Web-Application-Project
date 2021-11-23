interface SignInRequestPayload {
  email?: string
  password?: string
}

interface SignInResponsePayload {
  refresh: string
  access: string
}

interface RefreshSessionPayLoad {
  access: string
}

interface ErrorResponsePayload {
  detail: string
}

export type { SignInRequestPayload, SignInResponsePayload, RefreshSessionPayLoad, ErrorResponsePayload }
