import { getTranslations } from 'next-intl/server'
import ThemeToggle from '@/features/themeToggle/ui/ThemeToggle'
import LanguageToggle from '@/features/languageToggle/ui/LanguageToggle'

export default async function Footer() {
  const t = await getTranslations('Footer')

  return (
    <footer className="border-t border-gray-200 dark:border-white/20">
      <div className="container px-4 mx-auto py-1 flex items-center justify-between">
        <p className="italic text-sm">{t('copyright', { date: new Date(Date.now()).getFullYear() })}</p>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </footer>
  )
}
