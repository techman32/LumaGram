'use server'
import { sendRequestWithToken } from '@/shared/api/api'
import { CreatedPostDto } from '@/shared/common/types/posts'
import { CommentDto } from '@/shared/common/types/comment'

export const getProfilePosts = async (username: string) => {
  return await sendRequestWithToken(`users/${username}/posts`, { method: 'GET' })
}

export const getSubscriptionFeed = async () => {}

export const getFeed = async () => {
  return await sendRequestWithToken('feed', { method: 'GET' })
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

export const toggleLikePost = async (postId: string) => {
  return await sendRequestWithToken(`posts/${postId}/likes`, {
    method: 'PUT',
  })
}

export const getComments = async (postId: string) => {
  return await sendRequestWithToken(`posts/${postId}/comments`, {
    method: 'GET',
  })
}

export const createComment = async (postId: string, data: CommentDto) => {
  return await sendRequestWithToken(`posts/${postId}/comments`, {
    method: 'POST',
    body: data,
  })
}

export const editComment = async (commentId: string) => {}

export const deleteComment = async (commentId: string) => {}
