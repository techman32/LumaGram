import { Field, ResponseBody, ResponseError } from '@/shared/api/response'

type AllowedMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface SendRequestOptions<TBody = unknown> {
  method?: AllowedMethod
  body?: TBody
  token?: string
  params?: Record<string, string | number | boolean>
}

export const sendRequest = async <TData = any, TBody = unknown>(
  url: string,
  options: SendRequestOptions<TBody> = {},
): Promise<TData> => {
  const { method = 'GET', body, token, params } = options
  const headers: HeadersInit = {}

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const queryString = params
    ? '?' +
      new URLSearchParams(
        Object.entries(params).reduce<Record<string, string>>((acc, [key, value]) => {
          acc[key] = String(value)
          return acc
        }, {}),
      ).toString()
    : ''

  const response = await fetch(`http://localhost:8000/api/${url}${queryString}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const json: ResponseBody<TData> = await response.json()

  if (!response.ok || !json.success) {
    throw new ApiError(json.error ?? { fields: [{ field: 'unknown', message: 'Something went wrong' }] })
  }

  return json.data!
}

export class ApiError extends Error {
  fields?: Field[]

  constructor(error: ResponseError) {
    super(error.fields?.[0]?.message || 'Request failed')
    this.fields = error.fields
  }
}
