'use client'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import { useLoginFormStore } from '@/entities/login-form/model/store'
import { FormEvent, useState } from 'react'
import { getErrorMessage } from '@/shared/lib/errors'
import Link from 'next/link'

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const { loginForm, updateField } = useLoginFormStore()

  const handleLogin = (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    if (loginForm.password === '' || loginForm.username === '') {
      setError('general/empty-fields')
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="font-semibold text-xl">Вход</h2>
      <form className="flex flex-col gap-2 w-full items-center" onSubmit={handleLogin}>
        <Input
          placeholder="Введите имя пользователя"
          onChange={(event) => updateField('username', event.target.value)}
        />
        <Input placeholder="Введите пароль" onChange={(event) => updateField('password', event.target.value)} />
        <Button block type="submit" appearance="primary">
          Войти
        </Button>
        <Link href="/" className="opacity-70 italic text-sm underline-offset-2 hover:underline">
          Забыли пароль?
        </Link>
        {error && <p className="text-red-500 italic text-sm">{getErrorMessage(error)}</p>}
      </form>
    </div>
  )
}
