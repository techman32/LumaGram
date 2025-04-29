import { useTranslations } from 'next-intl'

export function useErrorMessages() {
  const t = useTranslations('Errors')

  return (errorCode: string): string => {
    return t(errorCode, { defaultValue: t('unknown') })
  }
}
