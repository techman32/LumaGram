import { SwitchFormModeProps } from '@/widgets/authForm/model/types'
import { useTranslations } from 'next-intl'

export default function SwitchFormMode({ mode, onSwitch }: SwitchFormModeProps) {
  const t = useTranslations('AuthPage')

  return (
    <div className="flex gap-2 flex-wrap justify-center text-sm opacity-60">
      <p>{mode === 'sign-up' ? t('have-account') : t('no-account')}</p>
      <button
        className="cursor-pointer underline underline-offset-2 hover:no-underline"
        onClick={() => {
          if (mode === 'sign-up') onSwitch('sign-in')
          else onSwitch('sign-up')
        }}
      >
        {mode === 'sign-up' ? t('login') : t('register')}
      </button>
    </div>
  )
}
