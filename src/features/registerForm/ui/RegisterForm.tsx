import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerDefaultValues, registerSchema } from '@/features/registerForm/model/schema'
import { useErrorMessages } from '@/shared/lib/errorMessages'
import { RegisterFormDto } from '@/shared/model/types/auth'
import { registerUser } from '@/shared/api/auth/api'
import { useRouter } from '@/i18n/navigation'

export default function RegisterForm() {
  const t = useTranslations('AuthPage')
  const getErrorMessage = useErrorMessages()
  const router = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(registerSchema),
    defaultValues: registerDefaultValues,
  })

  const onSubmit = async (data: RegisterFormDto) => {
    const result = await registerUser(data)

    if (!result.success && result.error) {
      result.error.forEach(({ field, message }) => {
        setError(field as keyof RegisterFormDto, {
          type: 'manual',
          message,
        })
      })
    } else {
      router.push(`/${result.data?.username}`)
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
        placeholder={t('enter-email')}
        label={t('email')}
        {...register('email')}
        error={errors.email && getErrorMessage(errors.email.message as string)}
      />
      <Input
        block
        placeholder={t('enter-password')}
        label={t('password')}
        {...register('password')}
        error={errors.password && getErrorMessage(errors.password.message as string)}
      />
      <Input
        block
        placeholder={t('repeat-password')}
        label={t('repeated-password')}
        {...register('repeatedPassword')}
        error={errors.repeatedPassword && getErrorMessage(errors.repeatedPassword.message as string)}
      />
      <Button block appearance="primary">
        {t('sign-up')}
      </Button>
    </form>
  )
}
