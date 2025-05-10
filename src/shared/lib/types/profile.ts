export type Image = {
  mime: string
  width: number
  height: number
  url: string
}

export type ProfileBody = {
  username: string
  name?: string
  description?: string
  activityCategory?: string
  isPublic: boolean
  image?: Image
  postsCount: number
  /** Количество подписок TODO: убрать опциональность */
  followerCount?: number
  /** Количество подписчиков TODO: убрать опциональность */
  followingCount?: number
}

export type EditedProfileData = {
  name?: string
  description?: string
  activityCategory?: string
  isPublic?: boolean
}

export type EditedUsernameData = {
  username: string
}

export type EditedPhotoData = {
  image: File
}
