'use client'
import Link from 'next/link'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import Checkbox from '@/shared/ui/Checkbox'
import { useErrorMessages } from '@/shared/lib/errors'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { LoginFormValues } from '@/shared/lib/types'

export default function LoginForm() {
  const t = useTranslations('AuthPage')
  const getErrorMessage = useErrorMessages()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>()

  const onSubmit = (data: LoginFormValues) => {
    console.log('Login Data:', data)
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="font-semibold text-xl dark:text-white">{t('sign-in')}</h2>
      <form className="flex flex-col gap-4 w-full items-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold dark:text-white">{t('username')}</h2>
          <Input
            placeholder={t('username-input')}
            {...register('username', { required: 'username-required' })}
            error={!!errors.username}
          />
          {errors.username && (
            <p className="text-red-500 italic text-sm">{getErrorMessage(errors.username.message as string)}</p>
          )}
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold dark:text-white">{t('password')}</h2>
          <Input
            placeholder={t('password-input')}
            type="password"
            error={!!errors.password}
            {...register('password', { required: 'password-required' })}
          />
          {errors.password && (
            <p className="text-red-500 italic text-sm">{getErrorMessage(errors.password.message as string)}</p>
          )}
        </div>
        <div className="flex justify-start w-full">
          <Checkbox label={t('remember-me')} id="remember" {...register('remember')} />
        </div>
        <Button block type="submit" appearance="primary" className="mt-2">
          {t('sign-in-action')}
        </Button>
        <Link href="/" className="opacity-70 italic text-sm underline-offset-2 hover:underline dark:text-white">
          {t('password-forgot')}
        </Link>
      </form>
    </div>
  )
}
