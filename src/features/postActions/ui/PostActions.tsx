'use client'
import { useState } from 'react'
import Button from '@/shared/ui/Button'
import { Heart, MessageCircle } from 'lucide-react'
import { toggleLikePost } from '@/shared/api/posts/api'

interface PostActionsProps {
  postId: string
  initialLikeCount: number
  initialCommentCount: number
  initiallyLiked: boolean
}

export default function PostActions({
  postId,
  initialLikeCount,
  initialCommentCount,
  initiallyLiked,
}: PostActionsProps) {
  const [liked, setLiked] = useState(initiallyLiked)
  const [likeCount, setLikeCount] = useState(initialLikeCount)

  const toggleLike = async () => {
    if (liked) {
      const res = await toggleLikePost(postId)
      if (res.success) {
        setLiked(false)
        setLikeCount((prev) => prev - 1)
      }
    } else {
      const res = await toggleLikePost(postId)
      if (res.success) {
        setLiked(true)
        setLikeCount((prev) => prev + 1)
      }
    }
  }

  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-2 items-center">
        <Button appearance="scalable" onClick={toggleLike}>
          {liked ? <Heart className="text-red-500 fill-red-500" size={20} /> : <Heart size={20} />}
        </Button>
        <span>{likeCount}</span>
      </div>
      <div className="flex gap-2 items-center">
        <Button appearance="scalable">
          <MessageCircle size={20} />
        </Button>
        <span>{initialCommentCount}</span>
      </div>
    </div>
  )
}
