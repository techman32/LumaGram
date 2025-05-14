'use client'
import Button from '@/shared/ui/Button'
import { Heart, MessageCircle } from 'lucide-react'
import { toggleLikePost } from '@/shared/api/posts/api'
import { useProfilePostsStore } from '@/shared/common/store/posts'

interface PostActionsProps {
  postId: string
  initialCommentCount: number
}

export default function PostActions({ postId, initialCommentCount }: PostActionsProps) {
  const post = useProfilePostsStore((state) => state.posts.find((p) => p.id === postId))
  const toggleLikeState = useProfilePostsStore((state) => state.toggleLike)

  const toggleLike = async () => {
    if (!post) return
    const res = await toggleLikePost(postId)
    if (res.success) {
      toggleLikeState(postId, !post.isLiked)
    }
  }

  if (!post) return null

  return (
    <div className="flex gap-4 items-center border-t border-gray-200 dark:border-white/20 px-2 py-1">
      <div className="flex gap-2 items-center">
        <Button appearance="scalable" onClick={toggleLike}>
          {post.isLiked ? <Heart className="text-red-500 fill-red-500" size={20} /> : <Heart size={20} />}
        </Button>
        <span>{post.likeCount}</span>
      </div>
      <div className="flex gap-2 items-center">
        <Button appearance="scalable">
          <MessageCircle size={20} />
        </Button>
        <span>{post?.commentCount ?? initialCommentCount}</span>
      </div>
    </div>
  )
}
