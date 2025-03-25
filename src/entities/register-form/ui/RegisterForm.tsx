import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import { useRegisterFormStore } from '@/entities/register-form/model/store'
import { FormEvent, useState } from 'react'
import { getErrorMessage } from '@/shared/lib/errors'

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null)
  const { registerForm, updateField } = useRegisterFormStore()

  const handleRegister = (event: FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!registerForm.password || !registerForm.repeatedPassword || !registerForm.username) {
      setError('general/empty-fields')
    }

    if (registerForm.password !== registerForm.repeatedPassword) {
      setError('register/password-no-match')
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="font-semibold text-xl">Регистрация</h2>
      <form className="flex flex-col gap-2 w-full" onSubmit={handleRegister}>
        <Input
          placeholder="Введите имя пользователя"
          onChange={(event) => updateField('username', event.target.value)}
        />
        <Input placeholder="Введите пароль" onChange={(event) => updateField('password', event.target.value)} />
        <Input
          placeholder="Повторите пароль"
          onChange={(event) => updateField('repeatedPassword', event.target.value)}
        />
        <Button appearance="primary">Зарегистрироваться</Button>
        {error && <p className="text-red-500 italic text-sm">{getErrorMessage(error)}</p>}
      </form>
    </div>
  )
}
