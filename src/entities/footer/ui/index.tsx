import { ThemeToggle } from '@/entities/theme-toggle/ui'

export default function Footer() {
  return (
    <div className="border-t border-gray-200 dark:border-white/10 bg-white dark:bg-black/90">
      <div className="container mx-auto py-2 flex justify-between items-center">
        <p className="opacity-70 italic text-sm dark:text-white">
          Copyright © {new Date(Date.now()).getFullYear()} Applice Studio
        </p>
        <ThemeToggle />
      </div>
    </div>
  )
}
