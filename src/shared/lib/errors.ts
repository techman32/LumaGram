const errorMap: Record<string, string> = {
  'register/password-no-match': 'Введенные пароли не совпадают',
  'general/empty-fields': 'Есть незаполненные поля',
}

export function getErrorMessage(errorCode: string): string {
  return errorMap[errorCode] || 'Произошла неизвестная ошибка'
}
