'use client'
import Button from '@/shared/ui/Button'
import { useState } from 'react'
import { useLocale } from 'use-intl'
import cn from 'classnames'
import { useRouter } from '@/i18n/routing'

const Locale = {
  'en': 'English',
  'ru': 'Русский',
}

export default function LanguageChanger() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const locale = useLocale()
  const router = useRouter()

  const handleLanguageChange = (newLocale: string) => {
    const currentPath = window.location.pathname
    const pathWithoutLocale = currentPath.replace(new RegExp(`^/${locale}`), '') || '/'
    router.push(pathWithoutLocale, { locale: newLocale })
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button className="group py-1" appearance="ghost" onClick={() => setIsOpen(!isOpen)}>
        {Locale[locale as keyof typeof Locale]}
      </Button>
      {isOpen && (
        <ul
          className={cn(
            'absolute left-0 w-full min-w-[120px] bottom-full mb-1 bg-white dark:bg-black/10 backdrop-blur-md overflow-hidden border border-gray-200 dark:border-white/10 rounded-md shadow-lg z-50',
          )}
        >
          {Object.entries(Locale).map(([langCode, langName]) => (
            <li key={langCode}>
              <button
                className={cn('cursor-pointer w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-white/10', {
                  'bg-gray-100 dark:bg-white/10': locale === langCode,
                })}
                onClick={() => handleLanguageChange(langCode)}
                disabled={locale === langCode}
              >
                {langName}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
