import CommentSender from '@/features/commentSender/ui/CommentSender'
import { useEffect } from 'react'
import { getComments } from '@/shared/api/posts/api'

type CommentsProps = {
  postId: string
}

export default function Comments({ postId }: CommentsProps) {
  useEffect(() => {
    getComments(postId).then((res) => {
      console.log(res)
    })
  }, [])

  return (
    <div>
      <CommentSender postId={postId} />
    </div>
  )
}
