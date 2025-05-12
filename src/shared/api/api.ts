import { Field, ResponseBody, ErrorFields } from '@/shared/common/types/response'
import { AllowedMethod, SendRequestOptions } from '@/shared/common/types/request'
import { cookies } from 'next/headers'

export const sendRequest = async <TData = any, TBody = unknown>(
  url: string,
  options: SendRequestOptions<TBody> = {},
): Promise<TData> => {
  const { method = 'GET', body, token, params } = options
  const headers: HeadersInit = {}

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData

  const queryString = params
    ? '?' +
      new URLSearchParams(
        Object.entries(params).reduce<Record<string, string>>((acc, [key, value]) => {
          acc[key] = String(value)
          return acc
        }, {}),
      ).toString()
    : ''

  const resBody = body ? (isFormData ? body : JSON.stringify(body)) : undefined

  const response = await fetch(`http://localhost:8000/api/${url}${queryString}`, {
    method,
    headers: {
      'Accept': 'application/json',
      ...headers,
      ...(isFormData
        ? {}
        : {
            'Content-Type': 'application/json',
          }),
    },
    body: resBody,
  })

  const json: ResponseBody<TData> = await response.json()

  if (!response.ok || !json.success) {
    throw new ApiError(json.error ?? { fields: [{ field: 'unknown', message: 'Something went wrong' }] })
  }

  return json.data!
}

export class ApiError extends Error {
  fields?: Field[]

  constructor(error: ErrorFields) {
    super(error.fields?.[0]?.message || 'Request failed')
    this.fields = error.fields
  }
}

export async function sendRequestWithToken<TData = any, TBody = unknown>(
  url: string,
  options: {
    method?: AllowedMethod
    body?: TBody
    params?: Record<string, string | number | boolean>
  } = {},
): Promise<ResponseBody<TData>> {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')?.value

  if (!token) {
    return { success: false, error: { fields: [{ field: 'accessToken', message: 'No token provided' }] } }
  }

  try {
    const data = await sendRequest<TData, TBody>(url, {
      ...options,
      token,
    })

    return {
      success: true,
      data,
    }
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, error: { fields: error.fields } }
    }

    return {
      success: false,
      error: { fields: [{ field: 'unknown', message: 'Unexpected error' }] },
    }
  }
}
