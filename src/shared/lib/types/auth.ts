export type RegisterData = {
  username: string
  email: string
  password: string
}

export type LoginData = {
  username: string
  password: string
  rememberMe: boolean
}

export type AuthBody = {
  username: string
  accessToken: string
  refreshToken: string
  expirationDate: string
  timestamp: string
}
