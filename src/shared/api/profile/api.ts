'use server'
import { ApiError, sendRequest } from '@/shared/api/api'
import { EditedProfileData, EditedUsernameData, ProfileBody } from '@/shared/lib/types/profile'
import { cookies } from 'next/headers'
import { updateUsernameCookie } from '@/shared/lib/cookies'

export const getProfile = async (username: string) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) {
    return { success: false, error: [{ field: 'accessToken', message: 'No token provided' }] }
  }

  try {
    const response = await sendRequest<ProfileBody>(`users/${username}/profile`, {
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

export const editProfile = async (data: EditedProfileData) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) {
    return { success: false, error: [{ field: 'accessToken', message: 'No token provided' }] }
  }

  try {
    const response = await sendRequest<EditedProfileData>(`users/profile`, {
      method: 'PUT',
      token: token,
      body: data,
    })

    return { success: true, data: response }
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, error: error.fields }
    }
    return { success: false, error: [{ field: 'unknown', message: 'Unexpected error' }] }
  }
}

export const editUsername = async (data: EditedUsernameData) => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) {
    return { success: false, error: [{ field: 'accessToken', message: 'No token provided' }] }
  }

  try {
    const response = await sendRequest<EditedProfileData>(`users/profile/change-username`, {
      method: 'PUT',
      token: token,
      body: data,
    })

    await updateUsernameCookie(data.username)

    return { success: true, data: response }
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, error: error.fields }
    }
    return { success: false, error: [{ field: 'unknown', message: 'Unexpected error' }] }
  }
}
