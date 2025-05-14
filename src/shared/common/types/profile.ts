import { Image } from '@/shared/common/types/image'

export type FollowingStatus = 'notFollowed' | 'followed' | null

export type ProfileDto = {
  username: string
  name?: string
  description?: string
  activityCategory?: string
  followingStatus: FollowingStatus
  isPublic: boolean
  image?: Image
  postsCount: number
  followersCount: number
  followingCount: number
}

export type GeneralProfileEditDto = {
  name?: string
  description?: string
  activityCategory?: string
  isPublic?: boolean
}

export type UsernameProfileEditDto = {
  username: string
}

export type PhotoProfileEditDto = {
  image: File
}
