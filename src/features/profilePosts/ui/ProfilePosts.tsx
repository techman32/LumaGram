'use client'
import Gallery from '@/widgets/posts/ui/Gallery'
import { getProfilePosts } from '@/shared/api/posts/api'
import { useEffect } from 'react'
import { useProfilePostsStore } from '@/shared/common/store/posts'

type ProfilePostsProps = {
  username: string
}

export default function ProfilePosts({ username }: ProfilePostsProps) {
  const { posts, setPosts } = useProfilePostsStore()

  useEffect(() => {
    if (posts.length === 0) {
      getProfilePosts(username).then((res) => {
        if (res.data) {
          setPosts(res.data.posts)
        }
      })
    }
  }, [posts.length, setPosts, username])

  return <Gallery posts={posts} />
}
