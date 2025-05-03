'use client'
import { useState } from 'react'
import { FormMode } from '@/widgets/auth/model/types'
import { useTranslations } from 'next-intl'
import SwitchFormMode from '@/widgets/auth/ui/SwitchFormMode'
import RegisterForm from '@/features/registerForm/ui/RegisterForm'
import LoginForm from '@/features/loginForm/ui/LoginForm'

export default function AuthForm() {
  const [mode, setMode] = useState<FormMode>('sign-up')
  const t = useTranslations('AuthPage')

  return (
    <div className="max-w-sm w-full border border-gray-200 dark:border-white/20 rounded-md p-8 flex flex-col justify-center items-center gap-4">
      <h2 className="text-xl font-semibold">{mode === 'sign-up' ? t('sign-up') : t('sign-in')}</h2>
      {mode === 'sign-up' ? <RegisterForm /> : <LoginForm />}
      <SwitchFormMode mode={mode} onSwitch={setMode} />
    </div>
  )
}
