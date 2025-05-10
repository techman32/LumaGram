export type Field = {
  field: string
  message: string
}

export type ResponseError = {
  fields?: Field[]
}

export type ResponseBody<TBody = any> = {
  success: boolean
  data?: TBody
  error?: ResponseError
}
