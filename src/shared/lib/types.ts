export type LoginFormValues = {
  username: string
  password: string
  rememberMe?: boolean
}

export type RegisterFormValues = {
  username: string
  email: string
  password: string
  repeatPassword: string
}

export type Profile = {
  username: string
  posts: number
  followers: number
  following: number
  name: string
  description: string
}
