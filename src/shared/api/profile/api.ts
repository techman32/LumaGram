'use server'
import { ApiError, sendRequest } from '@/shared/api/api'
import { ProfileBody } from '@/shared/lib/types/profile'
import { cookies } from 'next/headers'

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
