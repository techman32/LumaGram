'use client'
import { useEffect } from 'react'
import PostActions from '@/features/postActions/ui/PostActions'
import Comments from '@/features/comments/ui/Comments'
import { PostDto } from '@/shared/common/types/posts'
import PostUserInfo from '@/features/post/ui/PostUserInfo'
import Button from '@/shared/ui/Button'
import { Trash2 } from 'lucide-react'
import { deleteProfilePost } from '@/shared/api/posts/api'

export default function PostModal({
  post,
  onCloseAction,
  likedByCurrentUser,
}: {
  post: PostDto
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

  const deletePost = () => {
    deleteProfilePost(post.id).then((res) => {
      if (res.success) {
        onCloseAction()
      }
    })
  }

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center gap-2"
      onClick={onCloseAction}
    >
      <div
        className="bg-white dark:bg-black dark:border dark:border-white/20 p-6 rounded-lg shadow-md w-full max-w-[64rem] flex gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4 w-full max-w-[32rem]">
          <img src={`http://localhost:8000/${post.image.url}`} alt={post.description} className="rounded-md" />
          <PostActions
            postId={post.id}
            initialLikeCount={post.likeCount}
            initialCommentCount={post.commentCount}
            initiallyLiked={likedByCurrentUser}
          />
          {post.description && <p className="text-sm text-gray-600 dark:text-white/80">{post.description}</p>}
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <PostUserInfo username={post.user.username} image={post.user.image} />
            <Button onClick={deletePost}>
              <Trash2 size={20} className="text-red-500" />
            </Button>
          </div>
          <Comments postId={post.id} />
        </div>
      </div>
    </div>
  )
}
