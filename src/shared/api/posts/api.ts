'use server'
import { cookies } from 'next/headers'
import { ApiError, sendRequest } from '@/shared/api/api'
import { CreatedPostData } from '@/shared/lib/types/posts'

export const getPosts = async (username: string) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) {
    return { success: false, error: [{ field: 'accessToken', message: 'No token provided' }] }
  }

  try {
    // const response = await sendRequest<any>(`users/${username}/posts`, {
    //   method: 'GET',
    //   token: token,
    // })
    const response = await sendRequest('posts', {
      method: 'GET',
      token: token,
    })

    return { success: true, data: response }
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, error: error.fields }
    }
    return { success: false, error: [{ field: 'unknown', message: 'Unexpected error' }] }
  }
}

export const getFeed = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) {
    return { success: false, error: [{ field: 'accessToken', message: 'No token provided' }] }
  }

  try {
    // TODO: Изменить url на /feed вместо /posts
    const response = await sendRequest('posts', {
      method: 'GET',
      token: token,
    })

    return { success: true, data: response }
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, error: error.fields }
    }
    return { success: false, error: [{ field: 'unknown', message: 'Unexpected error' }] }
  }
}

export const createPost = async (data: CreatedPostData) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) {
    return { success: false, error: [{ field: 'accessToken', message: 'No token provided' }] }
  }

  const bytes = await data.image.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const serverFormData = new FormData()
  serverFormData.append('image', new File([buffer], data.image.name, { type: data.image.type }))
  serverFormData.append('description', data.description)

  try {
    const response = await sendRequest<CreatedPostData>(`posts`, {
      method: 'POST',
      token: token,
      body: serverFormData,
    })

    console.log('response', response)
    return { success: true, data: response }
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, error: error.fields }
    }
    return { success: false, error: [{ field: 'unknown', message: 'Unexpected error' }] }
  }
}

export const toggleLikePost = async (postId: string) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) {
    return { success: false, error: [{ field: 'accessToken', message: 'No token provided' }] }
  }

  try {
    const response = await sendRequest(`posts/${postId}/likes`, {
      method: 'PUT',
      token: token,
    })

    return { success: true, data: response }
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, error: error.fields }
    }
    return { success: false, error: [{ field: 'unknown', message: 'Unexpected error' }] }
  }
}

export const getComments = async (postId: string) => {}

export const createComment = async (postId: string) => {}

export const editComment = async (commentId: string) => {}

export const deleteComment = async (commentId: string) => {}
