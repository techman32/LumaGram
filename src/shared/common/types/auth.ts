export type RegisterFormDto = {
  username: string
  email: string
  password: string
}

export type LoginFormDto = {
  username: string
  password: string
  rememberMe: boolean
}

export type AuthResponse = {
  username: string
  accessToken: string
  refreshToken: string
  expirationDate: string
  timestamp: string
}
