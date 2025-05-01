export type ProfileBody = {
  username: string
  name?: string
  description?: string
  activityCategory?: string
  isPublic: boolean
  image?: string
  postsCount: number
  /** Количество подписок TODO: убрать опциональность */
  followerCount?: number
  /** Количество подписчиков TODO: убрать опциональность */
  followingCount?: number
}
