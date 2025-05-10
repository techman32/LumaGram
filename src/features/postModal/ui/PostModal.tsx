'use client'
import { useEffect } from 'react'
import PostActions from '@/features/postActions/ui/PostActions'

export default function PostModal({
  image,
  description,
  postId,
  likeCount,
  commentCount,
  onCloseAction,
  likedByCurrentUser,
}: {
  image: string
  description: string
  likeCount: number
  postId: string
  commentCount: number
  likedByCurrentUser: boolean
  onCloseAction: () => void
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseAction()
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onCloseAction])

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center"
      onClick={onCloseAction}
    >
      <div
        className="bg-white dark:bg-black/20 dark:border dark:border-white/20 p-6 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={image} alt={description} />
        <PostActions
          postId={postId}
          initialLikeCount={likeCount}
          initialCommentCount={commentCount}
          initiallyLiked={likedByCurrentUser}
        />
        {description && <p className="text-sm text-gray-600 dark:text-white/80">{description}</p>}
      </div>
    </div>
  )
}
