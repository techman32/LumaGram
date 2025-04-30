import { useTranslations } from 'next-intl'

export function useErrorMessages() {
  const t = useTranslations('Errors')

  return (errorCode: string): string => {
    const normalizedCode = errorCode.toLowerCase().replace(/\s+/g, '-').replace(/\./g, '')
    return t(normalizedCode, { defaultValue: t('unknown') })
  }
}
