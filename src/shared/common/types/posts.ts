import { Image } from '@/shared/common/types/image'

export type PostDto = {
  id: string
  image: Image
  description: string
  publishedAt: string
  likeCount: number
  isLiked: boolean
  commentCount: number
  user: {
    username: string
    image: Image
  }
}

export type CreatedPostDto = {
  image: File
  description: string
}
