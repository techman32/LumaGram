export type AllowedMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface SendRequestOptions<TBody = unknown> {
  method?: AllowedMethod
  body?: TBody
  token?: string
  params?: Record<string, string | number | boolean>
}
