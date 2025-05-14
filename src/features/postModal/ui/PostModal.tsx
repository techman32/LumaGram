'use client'
import { useEffect } from 'react'
import PostActions from '@/features/postActions/ui/PostActions'
import Comments from '@/features/comments/ui/Comments'
import { PostDto } from '@/shared/common/types/posts'
import PostUserInfo from '@/features/post/ui/PostUserInfo'
import Button from '@/shared/ui/Button'
import { Trash2 } from 'lucide-react'
import { deleteProfilePost } from '@/shared/api/posts/api'
import Image from 'next/image'
import Photo from '@/shared/ui/Photo'
import CommentSender from '@/features/commentSender/ui/CommentSender'

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
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex justify-center items-center gap-2"
      onClick={onCloseAction}
    >
      <div
        className="relative z-50 max-w-5xl w-full mx-4 md:mx-auto bg-white dark:bg-black rounded-md overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:w-[640px] w-full aspect-square bg-black">
          <Image
            src={`http://localhost:8000/${post.image.url}`}
            alt={post.description}
            width={post.image.width}
            height={post.image.height}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:max-w-md flex flex-col aspect-square justify-between overflow-y-auto">
          <PostUserInfo username={post.user.username} image={post.user.image} />
          <div className="flex-grow overflow-y-auto pr-1">
            <Comments postId={post.id} />
          </div>
          <PostActions
            postId={post.id}
            initialLikeCount={post.likeCount}
            initialCommentCount={post.commentCount}
            initiallyLiked={likedByCurrentUser}
          />
          <CommentSender postId={post.id} />
        </div>
      </div>
    </div>
  )
}
