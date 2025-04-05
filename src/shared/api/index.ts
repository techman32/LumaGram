import {LoginFormValues, RegisterFormValues} from '@/shared/lib/types'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const request = async <T>(uri: string, method: HttpMethod, body?: unknown, headers: HeadersInit = {}): Promise<T> => {
  const options: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    credentials: 'include',
  }

  if (body && method !== 'GET') {
    options.body = JSON.stringify(body)
  }

  const response = await fetch(`http://localhost:3000/api/${uri}`, options)
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return await response.json() as Promise<T>
}

export const loginUser = async (data: LoginFormValues) => {
  try {
    return await request<LoginFormValues>('auth/login', 'POST', data)
  } catch (error) {
    console.error(error)
  }
}

export const registerUser = async (data: RegisterFormValues) => {
  try {
    return await request<RegisterFormValues>('auth/register', 'POST', data)
  } catch (error) {
    console.error(error)
  }
}
