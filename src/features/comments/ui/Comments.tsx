'use client'
import CommentSender from '@/features/commentSender/ui/CommentSender'
import { useEffect, useState } from 'react'
import { getComments } from '@/shared/api/posts/api'
import { CommentsDto } from '@/shared/common/types/comment'
import Photo from '@/shared/ui/Photo'
import Link from 'next/link'

type CommentsProps = {
  postId: string
}

export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<CommentsDto>({ comments: [] })

  useEffect(() => {
    getComments(postId).then((res) => {
      if (res && res.data) {
        setComments(res.data)
      }
    })
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <CommentSender postId={postId} />
      {comments.comments.length > 0 && (
        <div className="flex flex-col gap-4 overflow-y-auto max-h-64 pr-1">
          {comments.comments.map((comment) => (
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
      )}
    </div>
  )
}
