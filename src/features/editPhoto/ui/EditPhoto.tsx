'use client'
import { useEffect, useState } from 'react'
import Photo from '@/shared/ui/Photo'
import Button from '@/shared/ui/Button'
import { useTranslations } from 'next-intl'
import PhotoPickerModal from '@/features/photoPickerModal/ui/PhotoPickerModal'
import { editPhoto } from '@/shared/api/profile/api'
import { useSnackbar } from '@/shared/providers/SnackbarProvider'
import { Image } from '@/shared/common/types/image'

type EditPhotoProps = {
  image?: Image
}

export default function EditPhoto({ image }: EditPhotoProps) {
  const t = useTranslations('EditProfilePage')
  const [modalOpen, setModalOpen] = useState(false)
  const [previewSrc, setPreviewSrc] = useState<string | undefined>(undefined)
  const { showSnackbar } = useSnackbar()

  useEffect(() => {
    return () => {
      if (previewSrc) {
        URL.revokeObjectURL(previewSrc)
      }
    }
  }, [previewSrc])

  const handlePhotoSelect = async (file: File) => {
    const previewUrl = URL.createObjectURL(file)
    setPreviewSrc(previewUrl)

    await editPhoto({ image: file }).then((response) => {
      if (response.success) {
        showSnackbar(t('photo-changed'))
      } else {
        showSnackbar(t('wrong-photo'), 'error')
      }
    })
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <Photo src={previewSrc ?? (image ? `http://localhost:8000/${image.url}` : '')} />
      <Button appearance="secondary" onClick={() => setModalOpen(true)}>
        {t('change-photo')}
      </Button>
      <PhotoPickerModal
        isOpen={modalOpen}
        onCloseAction={() => setModalOpen(false)}
        onSelectAction={handlePhotoSelect}
        title={t('change-photo')}
      />
    </div>
  )
}
