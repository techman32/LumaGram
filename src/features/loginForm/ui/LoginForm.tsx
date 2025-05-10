import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import Checkbox from '@/shared/ui/Checkbox'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginDefaultValues, loginSchema } from '@/features/loginForm/model/schema'
import { LoginDto } from '@/shared/model/types/auth'
import { useErrorMessages } from '@/shared/common/lib/errorMessages'
import { loginUser } from '@/shared/api/auth/api'
import { useRouter } from '@/i18n/navigation'

export default function LoginForm() {
  const t = useTranslations('AuthPage')
  const getErrorMessage = useErrorMessages()
  const router = useRouter()

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    setError,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  })

  const onSubmit = async (data: LoginDto) => {
    if (isValid) {
      const result = await loginUser(data)

      if (!result.success && result.error) {
        result.error.forEach(({ field, message }) => {
          setError(field as keyof LoginDto, {
            type: 'manual',
            message,
          })
        })
      } else {
        router.push(`/${result.data?.username}`)
      }
    }
  }

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        block
        placeholder={t('enter-username')}
        label={t('username')}
        {...register('username')}
        error={errors.username && getErrorMessage(errors.username.message as string)}
      />
      <Input
        block
        type="password"
        placeholder={t('enter-password')}
        label={t('password')}
        {...register('password')}
        error={errors.password && getErrorMessage(errors.password.message as string)}
      />
      <Checkbox id={'rememberMe'} label={t('remember-me')} {...register('rememberMe')} />
      <Button block appearance="primary" disabled={!isValid || !isDirty}>
        {t('login')}
      </Button>
    </form>
  )
}
