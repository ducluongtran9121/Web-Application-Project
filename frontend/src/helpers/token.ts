import type { SignInResponsePayload } from '../models/payload'

type TokenType = 'access' | 'refresh'

class TokenStorage {
  public static readonly AccessTokenKey = 'access_token'
  public static readonly RefreshTokenKey = 'refresh_token'

  public static getToken(tokenType: TokenType): string | undefined {
    let token: string | null = ''

    if (tokenType === 'access') token = localStorage.getItem(this.AccessTokenKey)
    else if (tokenType === 'refresh') token = localStorage.getItem(this.RefreshTokenKey)

    return token ? token : undefined
  }

  public static storeTokens({ access, refresh }: SignInResponsePayload) {
    localStorage.setItem(this.AccessTokenKey, access)
    localStorage.setItem(this.RefreshTokenKey, refresh)
  }

  public static storeToken(tokenType: TokenType, value: string): void {
    if (tokenType === 'access') localStorage.setItem(this.AccessTokenKey, value)
    else if (tokenType === 'refresh') localStorage.setItem(this.RefreshTokenKey, value)
  }

  public static removeTokens(): void {
    localStorage.removeItem(this.AccessTokenKey)
    localStorage.removeItem(this.RefreshTokenKey)
  }
}

export { TokenStorage }
