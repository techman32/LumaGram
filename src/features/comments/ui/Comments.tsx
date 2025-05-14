'use client'
import { useEffect } from 'react'
import { getComments } from '@/shared/api/posts/api'
import { useCommentsStore } from '@/shared/common/store/comments'
import Photo from '@/shared/ui/Photo'
import Link from 'next/link'
import { getTimeAgo } from '@/shared/common/lib/date'

type Props = {
  postId: string
}

export default function Comments({ postId }: Props) {
  const comments = useCommentsStore((state) => state.commentsByPostId[postId]) ?? []
  const setComments = useCommentsStore((state) => state.setComments)

  useEffect(() => {
    getComments(postId).then((res) => {
      if (res.success && res.data) {
        console.log(res.data)
        setComments(postId, res.data.comments)
      }
    })
  }, [postId])

  return (
    <div className="flex flex-col gap-4 p-2">
      {comments
        .slice()
        .reverse()
        .map((comment) => (
          <div key={comment.id} className="flex gap-2">
            <div className="flex-shrink-0">
              <Photo size={32} src={comment.user.image ? `http://localhost:8000/${comment.user.image.url}` : ''} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-2 items-center">
                <Link href={`/${comment.user.username}`} className="font-semibold">
                  {comment.user.username}
                </Link>
                <p className="text-xs text-gray-400">{getTimeAgo(comment.createdAt)}</p>
              </div>
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
    </div>
  )
}
