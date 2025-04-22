'use client'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import { useErrorMessages } from '@/shared/lib/errors'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { RegisterFormValues } from '@/shared/lib/types'
import { registerUser } from '@/shared/api'
import { useRouter } from '@/i18n/routing'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerDefaultValues, RegisterSchema, registerSchema } from '@/entities/register-form/model/schema'

export default function RegisterForm() {
  const t = useTranslations('AuthPage')
  const getErrorMessage = useErrorMessages()
  const router = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<RegisterSchema>({
    mode: 'all',
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await registerUser(data)

      if (response) {
        if (response.success) {
          router.replace('/profile')
        } else {
          response.error?.map((er) => {
            setError('root', {
              type: 'manual',
              message: getErrorMessage(`register-not-valid-${er}`),
            })
          })
        }
      }
    } catch (error) {
      console.log(error)
      setError('root', {
        type: 'manual',
        message: getErrorMessage('server-error'),
      })
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="font-semibold text-xl dark:text-white">{t('sign-up')}</h2>
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
        {/* Это все компонент Input вместе с div*/}
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold dark:text-white">{t('email')}</h2>
          <Input
            placeholder={t('email-input')}
            {...register('email')}
            error={errors.email} // Убрать boolean, сделать передачу ошибки когда вынесу компонент
          />
          {errors.email && (
            <p className="text-red-500 italic text-sm">{getErrorMessage(errors.email.message as string)}</p>
          )}
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold dark:text-white">{t('password')}</h2>
          <Input
            placeholder={t('password-input')}
            type="password"
            {...register('password')}
            error={!!errors.password}
          />
          {errors.password && (
            <p className="text-red-500 italic text-sm">{getErrorMessage(errors.password.message as string)}</p>
          )}
        </div>
        <div className="w-full flex flex-col gap-2">
          <h2 className="font-semibold dark:text-white">{t('password-repeat')}</h2>
          <Input
            placeholder={t('password-repeat-input')}
            type="password"
            {...register('repeatPassword')}
            error={!!errors.repeatPassword}
          />
          {errors.repeatPassword && (
            <p className="text-red-500 italic text-sm">{getErrorMessage(errors.repeatPassword.message as string)}</p>
          )}
        </div>
        <Button block appearance="primary" className="mt-2">
          {t('sign-up-action')}
        </Button>
        {errors.root && <p className="text-red-500 italic text-sm text-center mt-2">{errors.root.message}</p>}
      </form>
    </div>
  )
}
