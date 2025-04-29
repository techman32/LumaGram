import AuthForm from '@/widgets/authForm/ui/AuthForm'
import { getTranslations } from 'next-intl/server'

export default async function AuthPage() {
  const t = await getTranslations('AuthPage')

  return (
    <div className="h-full overflow-scroll flex flex-col justify-center items-center gap-8 container px-4 mx-auto">
      <h1 className="text-2xl text-center font-bold">{t('title')}</h1>
      <AuthForm />
    </div>
  )
}
