import AuthForm from '@/entities/auth-form/ui/AuthForm'
import { useTranslations } from 'next-intl'

export default function AuthPage() {
  const t = useTranslations('AuthPage')
  return (
    <div className="h-screen w-full flex flex-col gap-6 justify-center items-center bg-gray-50">
      <h1 className="text-2xl font-bold">{t('welcome')}</h1>
      <AuthForm />
    </div>
  )
}
