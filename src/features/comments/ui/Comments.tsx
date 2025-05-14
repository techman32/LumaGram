'use client'
import { useEffect } from 'react'
import { getComments } from '@/shared/api/posts/api'
import { useCommentsStore } from '@/shared/common/store/comments'
import Photo from '@/shared/ui/Photo'
import Link from 'next/link'

type Props = {
  postId: string
}

export default function Comments({ postId }: Props) {
  const comments = useCommentsStore((state) => state.commentsByPostId[postId]) ?? []
  const setComments = useCommentsStore((state) => state.setComments)

  useEffect(() => {
    getComments(postId).then((res) => {
      if (res.success && res.data) {
        setComments(postId, res.data.comments)
      }
    })
  }, [postId])

  return (
    <div className="flex flex-col gap-4 p-2">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-2">
          <div className="flex-shrink-0">
            <Photo size={32} src={comment.user.image ? `http://localhost:8000/${comment.user.image.url}` : ''} />
          </div>
          <div className="flex flex-col gap-1">
            <Link href={`/${comment.user.username}`} className="font-semibold">
              {comment.user.username}
            </Link>
            <p>{comment.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
