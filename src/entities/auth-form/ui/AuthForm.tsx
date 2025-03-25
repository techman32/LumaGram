'use client'
import LoginForm from '@/entities/login-form/ui/LoginForm'
import RegisterForm from '@/entities/register-form/ui/RegisterForm'
import Button from '@/shared/ui/Button'
import { useState } from 'react'
import { useLoginFormStore } from '@/entities/login-form/model/store'
import { useRegisterFormStore } from '@/entities/register-form/model/store'

export default function AuthForm() {
  const [registered, setRegistered] = useState<boolean>(false)

  const resetLoginForm = useLoginFormStore((state) => state.resetForm)
  const resetRegisterForm = useRegisterFormStore((state) => state.resetForm)

  const toggleForm = () => {
    if (registered) {
      resetRegisterForm()
    } else {
      resetLoginForm()
    }
    setRegistered(!registered)
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex flex-col w-96 bg-white p-8 rounded-lg shadow-sm">
        {registered ? <LoginForm /> : <RegisterForm />}
      </div>
      <Button className="text-sm opacity-70 underline-offset-2 hover:underline" onClick={toggleForm}>
        {registered ? 'Еще не зарегистрированы?' : 'Уже есть аккаунт?'}
      </Button>
    </div>
  )
}
