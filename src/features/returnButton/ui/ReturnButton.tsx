'use client'
import { useRouter } from 'next/navigation'
import Button from '@/shared/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ReturnButton() {
  const t = useTranslations('Other')
  const router = useRouter()

  return (
    <Button onClick={() => router.back()}>
      <span className="flex gap-2 items-center">
        <span>
          <ArrowLeft size={16} />
        </span>
        <span className="font-medium">{t('return-button')}</span>
      </span>
    </Button>
  )
}
