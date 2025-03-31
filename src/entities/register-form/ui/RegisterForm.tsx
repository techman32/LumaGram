'use client'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import { useRegisterFormStore } from '@/entities/register-form/model/store'
import { FormEvent, useState } from 'react'
import { useErrorMessages } from '@/shared/lib/errors'
import { useTranslations } from 'next-intl'

export default function RegisterForm() {
  const t = useTranslations('AuthPage')
  const getErrorMessage = useErrorMessages()
  const [error, setError] = useState<string | null>(null)
  const { registerForm, updateField } = useRegisterFormStore()

  const handleRegister = (event: FormEvent) => {
    event.preventDefault()
    setError(null)

    if (!registerForm.password || !registerForm.repeatedPassword || !registerForm.username) {
      setError('empty-fields')
    }

    if (registerForm.password !== registerForm.repeatedPassword) {
      setError('password-no-match')
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="font-semibold text-xl">{t('sign-up')}</h2>
      <form className="flex flex-col gap-4 w-full items-center" onSubmit={handleRegister}>
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold">{t('username')}</h2>
          <Input placeholder={t('username-input')} onChange={(event) => updateField('username', event.target.value)} />
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold">{t('email')}</h2>
          <Input placeholder={t('email-input')} onChange={(event) => updateField('email', event.target.value)} />
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold">{t('password')}</h2>
          <Input
            placeholder={t('password-input')}
            type="password"
            onChange={(event) => updateField('password', event.target.value)}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold">{t('password-repeat')}</h2>
          <Input
            placeholder={t('password-repeat-input')}
            type="password"
            onChange={(event) => updateField('repeatedPassword', event.target.value)}
          />
        </div>
        <Button block appearance="primary">
          {t('sign-up-action')}
        </Button>
        {error && <p className="text-red-500 italic text-sm">{getErrorMessage(error)}</p>}
      </form>
    </div>
  )
}
