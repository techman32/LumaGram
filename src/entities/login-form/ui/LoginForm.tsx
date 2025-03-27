'use client'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import { useLoginFormStore } from '@/entities/login-form/model/store'
import { FormEvent, useState } from 'react'
import { useErrorMessages } from '@/shared/lib/errors'
import Link from 'next/link'
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
      <form className="flex flex-col gap-2 w-full items-center" onSubmit={handleLogin}>
        <Input placeholder={t('username')} onChange={(event) => updateField('username', event.target.value)} />
        <Input placeholder={t('password')} onChange={(event) => updateField('password', event.target.value)} />
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
