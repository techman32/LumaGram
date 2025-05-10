import { Image } from '@/shared/lib/types/image'

export type FeedPostBody = {
  id: string
  image: string
  description: string
  publishedAt: string
  likeCount: number
  commentCount: number
  user: {
    username: string
    image: Image
  }
}

export type CreatedPostData = {
  image: File
  description: string
}
