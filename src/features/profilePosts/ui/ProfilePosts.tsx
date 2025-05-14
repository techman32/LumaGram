'use client'
import Gallery from '@/widgets/posts/ui/Gallery'
import { getProfilePosts } from '@/shared/api/posts/api'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useProfilePostsStore } from '@/shared/common/store/posts'
import { PROFILE_POSTS_LIMIT } from '@/features/profilePosts/lib/consts'

type ProfilePostsProps = {
  username: string
}

export default function ProfilePosts({ username }: ProfilePostsProps) {
  const { posts, setPosts, appendPosts } = useProfilePostsStore()
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<HTMLDivElement | null>(null)
  const loadingRef = useRef(false)

  const loadPosts = useCallback(async () => {
    if (loadingRef.current || !hasMore) return
    loadingRef.current = true

    const res = await getProfilePosts(username, PROFILE_POSTS_LIMIT, offset)
    if (res.success && res.data) {
      const newPosts = res.data.posts

      if (offset === 0) {
        setPosts(newPosts)
      } else {
        appendPosts(newPosts)
      }

      setOffset((prev) => prev + newPosts.length)
      setHasMore(newPosts.length === PROFILE_POSTS_LIMIT)
    }

    loadingRef.current = false
  }, [username, offset, hasMore, setPosts, appendPosts])

  useEffect(() => {
    setOffset(0)
    setHasMore(true)
    setPosts([])
    loadPosts()
  }, [username])

  useEffect(() => {
    if (!observerRef.current || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadPosts()
        }
      },
      { threshold: 1.0 },
    )

    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [loadPosts, hasMore])

  return (
    <>
      <Gallery posts={posts} />
      {hasMore && <div ref={observerRef} className="h-6" />}
    </>
  )
}
