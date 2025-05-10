import { Image } from '@/shared/common/types/image'

export type PostDto = {
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

export type CreatedPostDto = {
  image: File
  description: string
}
