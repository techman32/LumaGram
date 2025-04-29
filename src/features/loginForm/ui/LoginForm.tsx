import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import Checkbox from '@/shared/ui/Checkbox'
import { useTranslations } from 'next-intl'

export default function LoginForm() {
  const t = useTranslations('AuthPage')

  return (
    <form className="w-full flex flex-col gap-4">
      <Input block placeholder={t('enter-username')} label={t('username')} />
      <Input block placeholder={t('enter-password')} label={t('password')} />
      <Checkbox id={'rememberMe'} label={t('remember-me')} />
      <Button block appearance="primary">
        {t('login')}
      </Button>
    </form>
  )
}
