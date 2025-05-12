'use client'
import Textarea from '@/shared/ui/Textarea'
import Button from '@/shared/ui/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { commentDefaultValues, type CommentSchema, commentSchema } from '@/features/commentSender/ui/model/schema'
import { createComment } from '@/shared/api/posts/api'
import { getCurrentUsername } from '@/shared/api/auth/api'

type CommentSenderProps = {
  postId: string
}

export default function CommentSender({ postId }: CommentSenderProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(commentSchema),
    defaultValues: commentDefaultValues,
  })

  const onSubmit = async (data: CommentSchema) => {
    const username = await getCurrentUsername().then((res) => {
      if (res.data) {
        return res.data.username
      } else {
        return ''
      }
    })
    createComment(postId, { ...data, username: username }).then((res) => {
      console.log(res)
    })
  }

  return (
    <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Textarea placeholder="Оставьте свой комментарий..." {...register('text')} />
      <div className="w-full flex justify-end">
        <Button appearance="primary">Отправить</Button>
      </div>
    </form>
  )
}
