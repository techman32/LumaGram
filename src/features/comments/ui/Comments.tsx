'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { getComments } from '@/shared/api/posts/api'
import { useCommentsStore } from '@/shared/common/store/comments'
import Photo from '@/shared/ui/Photo'
import Link from 'next/link'
import { getTimeAgo } from '@/shared/common/lib/date'
import { COMMENTS_LIMIT } from '@/features/comments/lib/consts'

type Props = {
  postId: string
}

export default function Comments({ postId }: Props) {
  const comments = useCommentsStore((state) => state.commentsByPostId[postId]) ?? []
  const hasMore = useCommentsStore((state) => state.hasMoreByPostId[postId] ?? true)
  const setComments = useCommentsStore((state) => state.setComments)
  const appendComments = useCommentsStore((state) => state.appendComments)
  const setHasMore = useCommentsStore((state) => state.setHasMore)

  const [offset, setOffset] = useState(0)
  const observerRef = useRef<HTMLDivElement | null>(null)
  const loadingRef = useRef(false)

  const loadMoreComments = useCallback(async () => {
    if (loadingRef.current || !hasMore) return
    loadingRef.current = true

    const res = await getComments(postId, COMMENTS_LIMIT, offset)
    if (res.success && res.data) {
      const newComments = res.data.comments
      if (offset === 0) {
        setComments(postId, newComments)
      } else {
        const existingIds = new Set(comments.map((c) => c.id))
        const newUniqueComments = newComments.filter((c) => !existingIds.has(c.id))
        appendComments(postId, newUniqueComments)
      }

      setOffset((prev) => prev + newComments.length)
      setHasMore(postId, newComments.length === COMMENTS_LIMIT)
    }

    loadingRef.current = false
  }, [postId, offset, hasMore, setComments, appendComments, setHasMore])

  useEffect(() => {
    setOffset(0)
    setHasMore(postId, true)
    loadMoreComments()
  }, [postId])

  useEffect(() => {
    if (!observerRef.current || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreComments()
        }
      },
      { threshold: 1.0 },
    )

    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [loadMoreComments, hasMore])

  return (
    <div className="flex flex-col gap-4 p-2">
      {comments.map((comment) => (
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
      {hasMore && <div ref={observerRef} className="h-6" />}
    </div>
  )
}
