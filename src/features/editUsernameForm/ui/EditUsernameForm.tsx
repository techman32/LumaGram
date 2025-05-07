'use client'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import { useTranslations } from 'next-intl'
import { useErrorMessages } from '@/shared/lib/errorMessages'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  editUsernameDefaultValues,
  EditUsernameSchema,
  editUsernameSchema,
} from '@/features/editUsernameForm/model/schema'
import { useEffect } from 'react'
import { useSnackbar } from '@/shared/providers/SnackbarProvider'
import { editUsername } from '@/shared/api/profile/api'

export default function EditUsernameForm({ username }: { username: string }) {
  const t = useTranslations('EditProfilePage')
  const getErrorMessage = useErrorMessages()
  const { showSnackbar } = useSnackbar()

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(editUsernameSchema),
    defaultValues: editUsernameDefaultValues,
  })

  useEffect(() => {
    if (username) {
      reset({ username })
    }
  }, [username, reset])

  const onSubmit = async (data: EditUsernameSchema) => {
    const response = await editUsername(data)
    if (response.success) {
      showSnackbar('Имя пользователя изменено', 'success')
    } else {
      showSnackbar('Произошла ошибка', 'error')
    }
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        block
        placeholder={t('enter-username')}
        description={t('current-username', { username: username })}
        label={t('username')}
        {...register('username')}
        error={errors.username && getErrorMessage(errors.username.message as string)}
      />
      <div className="flex gap-2">
        <Button block appearance="primary">
          {t('apply')}
        </Button>
      </div>
    </form>
  )
}
