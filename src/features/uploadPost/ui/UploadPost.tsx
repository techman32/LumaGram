'use client'

import PhotoPickerModal from '@/features/photoPickerModal/ui/PhotoPickerModal'
import Button from '@/shared/ui/Button'
import { PlusSquare } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { editPhoto } from '@/shared/api/profile/api'
import Textarea from '@/shared/ui/Textarea'
import { createPost } from '@/shared/api/posts/api'

type PostFormValues = {
  description: string
}

export default function UploadPost() {
  const [modalOpen, setModalOpen] = useState(false)

  const { control, getValues, reset } = useForm<PostFormValues>({
    defaultValues: { description: '' },
  })

  const handlePhotoSelect = async (file: File) => {
    const values = getValues()

    const response = await createPost({ image: file, description: values.description })
    if (response.success) {
      console.log('Пост создан')
      reset()
      setModalOpen(false)
    } else {
      console.log('Ошибка при создании поста')
    }
    console.log(response)
  }

  return (
    <>
      <Button appearance="scalable" onClick={() => setModalOpen(true)}>
        <PlusSquare size={20} />
      </Button>
      <PhotoPickerModal isOpen={modalOpen} onCloseAction={() => setModalOpen(false)} onSelectAction={handlePhotoSelect}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <Textarea placeholder="Введите описание" {...field} />}
        />
      </PhotoPickerModal>
    </>
  )
}
