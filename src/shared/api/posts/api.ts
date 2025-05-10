'use server'
import { sendRequestWithToken } from '@/shared/api/api'
import { CreatedPostDto } from '@/shared/common/types/posts'

export const getProfilePosts = async (username: string) => {}

export const getSubscriptionFeed = async () => {}

export const getFeed = async () => {
  // TODO: Изменить url на /feed вместо /posts
  return await sendRequestWithToken('posts', { method: 'GET' })
}

export const createPost = async (data: CreatedPostDto) => {
  const bytes = await data.image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const serverFormData = new FormData()
  serverFormData.append('image', new File([buffer], data.image.name, { type: data.image.type }))
  serverFormData.append('description', data.description)

  return await sendRequestWithToken<CreatedPostDto>('posts', {
    method: 'POST',
    body: serverFormData,
  })
}

export const deletePost = async (postId: string) => {}

export const toggleLikePost = async (postId: number) => {
  return await sendRequestWithToken(`posts/${postId}/likes`, {
    method: 'PUT',
  })
}

export const getComments = async (postId: string) => {}

export const createComment = async (postId: string) => {}

export const editComment = async (commentId: string) => {}

export const deleteComment = async (commentId: string) => {}
