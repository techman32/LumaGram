'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { commentSchema, commentDefaultValues, CommentSchema } from './model/schema'
import { useProfilePostsStore } from '@/shared/common/store/posts'
import { useCommentsStore } from '@/shared/common/store/comments'
import { createComment } from '@/shared/api/posts/api'
import Input from '@/shared/ui/Input'
import { getCurrentUsername } from '@/shared/api/auth/api'

type Props = {
  postId: string
}

export default function CommentSender({ postId }: Props) {
  const { updatePost, posts } = useProfilePostsStore()
  const addComment = useCommentsStore((state) => state.addComment)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm<CommentSchema>({
    mode: 'all',
    resolver: zodResolver(commentSchema),
    defaultValues: commentDefaultValues,
  })

  const onSubmit = async (data: CommentSchema) => {
    const username = await getCurrentUsername().then((res) => res.data?.username || '')
    const res = await createComment(postId, { ...data, username })

    if (res.success && res.data) {
      addComment(postId, res.data)
      const currentPost = posts.find((p) => p.id === postId)
      if (currentPost) {
        updatePost({ ...currentPost, commentCount: currentPost.commentCount + 1 })
      }

      reset()
    } else {
      setError('text', { message: 'Не удалось отправить комментарий' })
    }
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
