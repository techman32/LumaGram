'use client'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editProfileDefaultValues, editProfileSchema } from '@/features/editProfileForm/model/schema'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import { useTranslations } from 'next-intl'
import { useErrorMessages } from '@/shared/common/lib/errorMessages'
import Textarea from '@/shared/ui/Textarea'
import Toggle from '@/shared/ui/Toggle'
import { editProfile } from '@/shared/api/profile/api'
import { GeneralProfileEditDto } from '@/shared/common/types/profile'
import { useEffect } from 'react'
import { useSnackbar } from '@/shared/providers/SnackbarProvider'

type EditProfileFormProps = {
  name?: string
  activityCategory?: string
  description?: string
  isPublic?: boolean
}

export default function EditProfileForm({ profile }: { profile: EditProfileFormProps }) {
  const t = useTranslations('EditProfilePage')
  const getErrorMessage = useErrorMessages()
  const { showSnackbar } = useSnackbar()

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(editProfileSchema),
    defaultValues: editProfileDefaultValues,
  })

  useEffect(() => {
    if (profile) {
      reset(profile)
    }
  }, [profile, reset])

  const onSubmit = async (data: GeneralProfileEditDto) => {
    editProfile(data).then((res) => {
      if (res.success) {
        showSnackbar(t('changed'))
      } else {
        res.error?.fields?.map((field) => {
          showSnackbar(getErrorMessage(field.message), 'error')
        })
      }
    })
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
        {...register('activityCategory')}
        error={errors.activityCategory && getErrorMessage(errors.activityCategory.message as string)}
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
            <Toggle checked={!field.value} onChange={(val) => field.onChange(!val)} />
          </div>
        )}
      />
      <Button block appearance="primary">
        {t('apply')}
      </Button>
    </form>
  )
}
