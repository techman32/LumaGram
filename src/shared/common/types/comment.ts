import { Image } from '@/shared/common/types/image'

export type CreatedCommentDto = {
  text: string
  username: string
}

export type CommentDto = {
  createdAt: string
  id: string
  isEdited: boolean
  text: string
  user: {
    image: Image
    username: string
  }
}

export type CommentsDto = {
  comments: CommentDto[]
}
