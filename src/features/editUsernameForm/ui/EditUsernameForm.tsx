'use client'
import Input from '@/shared/ui/Input'
import Button from '@/shared/ui/Button'
import { useTranslations } from 'next-intl'
import { useErrorMessages } from '@/shared/lib/errorMessages'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { editUsernameDefaultValues, editUsernameSchema } from '@/features/editUsernameForm/model/schema'

export default function EditUsernameForm({ username }: { username: string }) {
  const t = useTranslations('EditProfilePage')
  const getErrorMessage = useErrorMessages()

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(editUsernameSchema),
    defaultValues: editUsernameDefaultValues,
  })

  const onSubmit = async (data: any) => {
    console.log(data)
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
