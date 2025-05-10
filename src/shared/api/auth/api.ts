'use server'
import { AuthResponse, LoginFormDto, RegisterFormDto } from '@/shared/common/types/auth'
import { ApiError, sendRequest, sendRequestWithToken } from '@/shared/api/api'
import { setAuthCookies } from '@/shared/common/lib/cookies'

export const registerUser = async (data: RegisterFormDto) => {
  try {
    const response = await sendRequest<AuthResponse, RegisterFormDto>('auth/register', {
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

export const loginUser = async (data: LoginFormDto) => {
  try {
    const response = await sendRequest<AuthResponse, LoginFormDto>('auth/login', {
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

export const getCurrentUsername = async () => {
  return await sendRequestWithToken<{ username: string }>('users/check', { method: 'GET' })
}
