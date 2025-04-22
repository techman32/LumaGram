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
  id: string
  username: string
  postsCount: number
  name?: string
  description?: string
  image?: string
  isPublic: boolean
  activityCategory: string
}
