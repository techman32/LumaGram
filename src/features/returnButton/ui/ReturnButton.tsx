'use client'
import Button from '@/shared/ui/Button'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'

export default function ReturnButton({ backUrl }: { backUrl: string }) {
  const t = useTranslations('Other')
  const router = useRouter()

  return (
    <Button onClick={() => router.replace(backUrl)}>
      <span className="flex gap-2 items-center">
        <span>
          <ArrowLeft size={16} />
        </span>
        <span className="font-medium">{t('return-button')}</span>
      </span>
    </Button>
  )
}
