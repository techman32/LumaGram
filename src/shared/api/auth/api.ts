'use server'
import { AuthBody, LoginData, RegisterData } from '@/shared/lib/types/auth'
import { ApiError, sendRequest } from '@/shared/api/api'
import { setAuthCookies } from '@/shared/lib/cookies'

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await sendRequest<AuthBody, RegisterData>('auth/register', {
      method: 'POST',
      body: data,
    })

    await setAuthCookies(response)

    return { success: true, data: response }
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, error: error.fields }
    }
    return { success: false, error: [{ field: 'unknown', message: 'Unexpected error' }] }
  }
}

export const loginUser = async (data: LoginData) => {
  try {
    const response = await sendRequest<AuthBody, LoginData>('auth/login', {
      method: 'POST',
      body: data,
    })

    await setAuthCookies(response)

    return { success: true, data: response }
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, error: error.fields }
    }
    return { success: false, error: [{ field: 'unknown', message: 'Unexpected error' }] }
  }
}
