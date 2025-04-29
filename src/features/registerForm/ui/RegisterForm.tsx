import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import { useTranslations } from 'next-intl'

export default function RegisterForm() {
  const t = useTranslations('AuthPage')

  return (
    <form className="w-full flex flex-col gap-4">
      <Input block placeholder={t('enter-username')} label={t('username')} />
      <Input block placeholder={t('enter-email')} label={t('email')} />
      <Input block placeholder={t('enter-password')} label={t('password')} />
      <Input block placeholder={t('repeat-password')} label={t('repeated-password')} />
      <Button block appearance="primary">
        {t('sign-up')}
      </Button>
    </form>
  )
}
