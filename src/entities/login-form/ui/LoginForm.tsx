'use client'
import Link from 'next/link'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import Checkbox from '@/shared/ui/Checkbox'
import { useLoginFormStore } from '@/entities/login-form/model/store'
import { FormEvent, useState } from 'react'
import { useErrorMessages } from '@/shared/lib/errors'
import { useTranslations } from 'next-intl'

export default function LoginForm() {
  const t = useTranslations('AuthPage')
  const getErrorMessage = useErrorMessages()
  const [error, setError] = useState<string | null>(null)
  const { loginForm, updateField } = useLoginFormStore()

  const handleLogin = (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    if (loginForm.password === '' || loginForm.username === '') {
      setError('empty-fields')
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="font-semibold text-xl">{t('sign-in')}</h2>
      <form className="flex flex-col gap-4 w-full items-center" onSubmit={handleLogin}>
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold">{t('username')}</h2>
          <Input placeholder={t('username-input')} onChange={(event) => updateField('username', event.target.value)} />
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold">{t('password')}</h2>
          <Input
            placeholder={t('password-input')}
            type="password"
            onChange={(event) => updateField('password', event.target.value)}
          />
        </div>
        <div className="flex justify-start w-full">
          <Checkbox
            label={t('remember-me')}
            id="remember"
            onChange={(event) => updateField('remember', event.target.checked)}
          />
        </div>
        <Button block type="submit" appearance="primary">
          {t('sign-in-action')}
        </Button>
        <Link href="/" className="opacity-70 italic text-sm underline-offset-2 hover:underline">
          {t('password-forgot')}
        </Link>
        {error && <p className="text-red-500 italic text-sm">{getErrorMessage(error)}</p>}
      </form>
    </div>
  )
}
