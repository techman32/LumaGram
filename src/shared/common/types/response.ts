export type Field = {
  field: string
  message: string
}

export type ErrorFields = {
  fields?: Field[]
}

export type SuccessResponse<T> = {
  success: true
  data: T
  error?: never
}

export type ErrorResponse = {
  success: false
  data?: never
  error: ErrorFields
}

export type ResponseBody<T = any> = SuccessResponse<T> | ErrorResponse
