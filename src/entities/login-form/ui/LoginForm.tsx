'use client'
import Link from 'next/link'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import Checkbox from '@/shared/ui/Checkbox'
import { useErrorMessages } from '@/shared/lib/errors'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { loginUser } from '@/shared/api'
import { useRouter } from '@/i18n/routing'
import { loginDefaultValues, loginSchema, LoginSchema } from '@/entities/login-form/model/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormValues } from '@/shared/lib/types'

export default function LoginForm() {
  const t = useTranslations('AuthPage')
  const getErrorMessage = useErrorMessages()
  const router = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginSchema>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await loginUser(data)

      if (response) {
        if (response.success) {
          router.replace('/profile')
        } else {
          setError('root', {
            type: 'manual',
            message: getErrorMessage(`login-not-valid-${response.error}`),
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
          <Checkbox label={t('remember-me')} id="rememberMe" {...register('rememberMe')} />
        </div>
        <Button block type="submit" appearance="primary" className="mt-2">
          {t('sign-in-action')}
        </Button>
        {errors.root && <p className="text-red-500 italic text-sm text-center mt-2">{errors.root.message}</p>}
        <Link href="/" className="opacity-70 italic text-sm underline-offset-2 hover:underline dark:text-white">
          {t('password-forgot')}
        </Link>
      </form>
    </div>
  )
}
