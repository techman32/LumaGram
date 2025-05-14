'use client'
import Textarea from '@/shared/ui/Textarea'
import Button from '@/shared/ui/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { commentDefaultValues, type CommentSchema, commentSchema } from '@/features/commentSender/ui/model/schema'
import { createComment } from '@/shared/api/posts/api'
import { getCurrentUsername } from '@/shared/api/auth/api'
import Input from '@/shared/ui/Input'
import { useProfilePostsStore } from '@/shared/common/store/posts'

type CommentSenderProps = {
  postId: string
}

export default function CommentSender({ postId }: CommentSenderProps) {
  const { updatePost, posts } = useProfilePostsStore()
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
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
      if (res.success) {
        const currentPost = posts.find((p) => p.id === postId)
        if (currentPost) {
          updatePost({ ...currentPost, commentCount: currentPost.commentCount + 1 })
        }
        reset()
      } else {
        setError('text', { message: 'Не удалось отправить комментарий' })
      }
    })
  }

  return (
    <form
      className="w-full flex gap-1 items-center border-t border-gray-200 dark:border-white/20 px-2 py-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex-1 flex gap-1 flex-col">
        <p className="opacity-40 text-sm">Чтобы отправить комментарий нажмите Enter</p>
        <Input block placeholder="Оставьте свой комментарий..." {...register('text')} />
      </div>
    </form>
  )
}
