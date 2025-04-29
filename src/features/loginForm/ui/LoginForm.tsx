import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import Checkbox from '@/shared/ui/Checkbox'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginDefaultValues, loginSchema } from '@/features/loginForm/model/schema'
import { LoginDto } from '@/shared/model/types/auth'
import { useErrorMessages } from '@/shared/lib/errorMessages'

export default function LoginForm() {
  const t = useTranslations('AuthPage')
  const getErrorMessage = useErrorMessages()

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: 'onSubmit',
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaultValues,
  })

  const onSubmit = async (data: LoginDto) => {
    console.log(data)
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
        placeholder={t('enter-password')}
        label={t('password')}
        {...register('password')}
        error={errors.password && getErrorMessage(errors.password.message as string)}
      />
      <Checkbox id={'rememberMe'} label={t('remember-me')} {...register('rememberMe')} />
      <Button block appearance="primary">
        {t('login')}
      </Button>
    </form>
  )
}
