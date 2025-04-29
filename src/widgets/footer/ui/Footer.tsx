import { getTranslations } from 'next-intl/server'

export default async function Footer() {
  const t = await getTranslations('Footer')

  return (
    <footer className="border-t border-gray-200 dark:border-white/20">
      <div className="container px-4 mx-auto py-2">
        <p className="italic text-sm">{t('copyright', { date: new Date(Date.now()).getFullYear() })}</p>
      </div>
    </footer>
  )
}
