'use client'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import { useRegisterFormStore } from '@/entities/register-form/model/store'
import { useErrorMessages } from '@/shared/lib/errors'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

type RegisterFormValues = {
  username: string
  email: string
  password: string
  repeatedPassword: string
}

export default function RegisterForm() {
  const t = useTranslations('AuthPage')
  const getErrorMessage = useErrorMessages()
  const { updateField } = useRegisterFormStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormValues>()

  const onSubmit = (data: RegisterFormValues) => {
    console.log('Register Data:', data)
    updateField('username', data.username)
    updateField('email', data.email)
    updateField('password', data.password)
    updateField('repeatedPassword', data.repeatedPassword)
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="font-semibold text-xl">{t('sign-up')}</h2>
      <form className="flex flex-col gap-4 w-full items-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold">{t('username')}</h2>
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
          <h2 className="font-semibold">{t('email')}</h2>
          <Input
            placeholder={t('email-input')}
            {...register('email', {
              required: 'email-required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'email-invalid' },
            })}
            error={!!errors.email}
          />
          {errors.email && (
            <p className="text-red-500 italic text-sm">{getErrorMessage(errors.email.message as string)}</p>
          )}
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold">{t('password')}</h2>
          <Input
            placeholder={t('password-input')}
            type="password"
            {...register('password', {
              required: 'password-required',
              minLength: { value: 6, message: 'password-short' },
            })}
            error={!!errors.password}
          />
          {errors.password && (
            <p className="text-red-500 italic text-sm">{getErrorMessage(errors.password.message as string)}</p>
          )}
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold">{t('password-repeat')}</h2>
          <Input
            placeholder={t('password-repeat-input')}
            type="password"
            {...register('repeatedPassword', {
              required: 'password-repeat-required',
              validate: (value) => value === watch('password') || 'password-no-match',
            })}
            error={!!errors.repeatedPassword}
          />
          {errors.repeatedPassword && (
            <p className="text-red-500 italic text-sm">{getErrorMessage(errors.repeatedPassword.message as string)}</p>
          )}
        </div>
        <Button block appearance="primary">
          {t('sign-up-action')}
        </Button>
      </form>
    </div>
  )
}
