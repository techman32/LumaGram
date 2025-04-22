export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export type RequestOptions = {
  url: string
  method: RequestMethod
  token?: string
  content?: any
  isFiles: boolean
  keepAlive?: boolean
}

export interface ResponseError {
  status: number
  error: string
  message: string
}

export interface ResponseData {
  success: boolean
  data?: any
  error?: ResponseError
}

export interface AuthorizationRequestOptions {
  token: string
}
