'use client'
import Button from '@/shared/ui/Button'
import { Locale } from '../model/constants'
import { useLocale } from 'use-intl'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from '@/i18n/navigation'
import cn from 'classnames'

export default function LanguageToggle() {
  const [open, setOpen] = useState<boolean>(false)
  const locale = useLocale()
  const router = useRouter()
  const toggleRef = useRef<HTMLDivElement>(null)

  const handleLanguageChange = (code: string) => {
    const url = new URL(window.location.href)
    const pathWithoutLocale = url.pathname.replace(new RegExp(`^/${locale}`), '') || '/'
    const newPathWithQuery = `${pathWithoutLocale}${url.search}`
    router.push(newPathWithQuery, { locale: code })
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={toggleRef} className="relative">
      <Button appearance="ghost" size="small" onClick={() => setOpen(!open)}>
        {Locale[locale as keyof typeof Locale]}
      </Button>
      {open && (
        <ul className="absolute bg-white dark:bg-black overflow-hidden left-0 bottom-full mb-1 border border-gray-200  dark:border-white/20 rounded-md">
          {Object.entries(Locale).map(([code, name]) => (
            <li key={code}>
              <button
                className={cn('cursor-pointer px-4 py-1 hover:bg-gray-200 dark:hover:bg-white/20 text-sm w-full', {
                  'bg-gray-200 dark:bg-white/20': locale === code,
                })}
                onClick={() => handleLanguageChange(code)}
                disabled={locale === code}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
