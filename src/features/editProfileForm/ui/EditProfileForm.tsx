'use client'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editProfileDefaultValues, editProfileSchema } from '@/features/editProfileForm/model/schema'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import { useTranslations } from 'next-intl'
import { useErrorMessages } from '@/shared/lib/errorMessages'
import Textarea from '@/shared/ui/Textarea'
import Toggle from '@/shared/ui/Toggle'

export default function EditProfileForm() {
  const t = useTranslations('EditProfilePage')
  const getErrorMessage = useErrorMessages()

  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    setError,
    control,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(editProfileSchema),
    defaultValues: editProfileDefaultValues,
  })

  const onSubmit = async (data: any) => {
    console.log(data)
  }

  return (
    <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        block
        placeholder={t('enter-name')}
        description={t('description-name-input')}
        label={t('name')}
        {...register('name')}
        error={errors.name && getErrorMessage(errors.name.message as string)}
      />
      <Input
        block
        placeholder={t('enter-category')}
        description={t('description-category-input')}
        label={t('category')}
        {...register('category')}
        error={errors.category && getErrorMessage(errors.category.message as string)}
      />
      <Textarea
        label={t('description')}
        description={t('description-description-input')}
        placeholder={t('enter-description')}
        {...register('description')}
        error={errors.description && getErrorMessage(errors.description.message as string)}
      />
      <Controller
        name="isPublic"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">{t('closed-profile')}</h2>
            <Toggle checked={field.value} onChange={field.onChange} />
          </div>
        )}
      />
      <Button block appearance="primary" disabled={!isValid || !isDirty}>
        {t('apply')}
      </Button>
    </form>
  )
}
