import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import { redirect } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

export default async function ResetPasswordPage({ searchParams }: { searchParams: { token?: string } }) {
  const t = await getTranslations('ResetPasswordPage')
  console.log(t)

  if (!searchParams?.token) {
    redirect('/auth')
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border rounded-md border-gray-200 bg-white dark:bg-black dark:border-white/10 max-w-96 w-full p-4 flex flex-col gap-6">
        <h1 className="text-xl font-bold text-center">{t('title')}</h1>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">{t('password')}</h2>
            <Input placeholder={t('password-input')} />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">{t('repeat-password')}</h2>
            <Input placeholder={t('repeat-password-input')} />
          </div>
          <Button appearance="primary">{t('save')}</Button>
        </form>
      </div>
    </div>
  )
}
