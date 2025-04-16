import { ThemeToggle } from '@/entities/theme-toggle/ui'
import LanguageChanger from '@/entities/language-changer/ui/LanguageChanger'

export default function Footer() {
  return (
    <div className="border-t border-gray-200 bg-gray-50 dark:bg-black/10 dark:border-white/10 px-4 sm:px-0">
      <div className="container mx-auto py-2 flex flex-col justify-between items-center sm:flex-row">
        <p className="opacity-70 italic text-sm dark:text-white">
          Copyright © {new Date(Date.now()).getFullYear()} Applice Studio
        </p>
        <div className="flex items-center gap-4">
          <LanguageChanger />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
