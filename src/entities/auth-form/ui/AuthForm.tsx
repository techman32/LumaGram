'use client'
import LoginForm from '@/entities/login-form/ui/LoginForm'
import RegisterForm from '@/entities/register-form/ui/RegisterForm'
import Button from '@/shared/ui/Button'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function AuthForm() {
  const t = useTranslations('AuthPage')
  const [registered, setRegistered] = useState<boolean>(false)

  const toggleForm = () => {
    setRegistered(!registered)
  }

  return (
    <div className="flex flex-col gap-4 items-center max-w-96 w-full">
      <div className="flex flex-col w-full bg-white dark:bg-black/10 p-8 rounded-lg not-dark:shadow-sm dark:border dark:border-white/10">
        {registered ? <LoginForm /> : <RegisterForm />}
      </div>
      <Button className="text-sm opacity-70 underline-offset-2 hover:underline dark:text-white" onClick={toggleForm}>
        {registered ? t('not-registered') : t('have-account')}
      </Button>
    </div>
  )
}
