'use client'
import Photo from '@/shared/ui/Photo'
import Button from '@/shared/ui/Button'
import { useTranslations } from 'next-intl'

export default function EditPhoto() {
  const t = useTranslations('EditProfilePage')

  return (
    <div className="flex flex-col gap-4 items-center">
      <Photo size={128} />
      <Button appearance="secondary">{t('change-photo')}</Button>
    </div>
  )
}
