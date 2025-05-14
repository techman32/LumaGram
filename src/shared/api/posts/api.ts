'use server'
import { sendRequestWithToken } from '@/shared/api/api'
import { CreatedPostDto, PostDto } from '@/shared/common/types/posts'
import { CommentsDto, CreatedCommentDto } from '@/shared/common/types/comment'

export const getProfilePosts = async (username: string, limit: number = 12, offset: number = 0) => {
  return await sendRequestWithToken(`users/${username}/posts`, { method: 'GET', params: { limit, offset } })
}

export const deleteProfilePost = async (postId: string) => {
  return await sendRequestWithToken(`posts/${postId}`, {
    method: 'DELETE',
  })
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

  return await sendRequestWithToken<PostDto, FormData>('posts', {
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
  return await sendRequestWithToken<CommentsDto>(`posts/${postId}/comments`, {
    method: 'GET',
  })
}

export const createComment = async (postId: string, data: CreatedCommentDto) => {
  return await sendRequestWithToken(`posts/${postId}/comments`, {
    method: 'POST',
    body: data,
  })
}

export const editComment = async (commentId: string) => {}

export const deleteComment = async (commentId: string) => {}
