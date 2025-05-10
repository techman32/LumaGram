import { useEffect, useState } from 'react'
import { getFeed } from '@/shared/api/posts/api'
import { PostDto } from '@/shared/common/types/posts'
import Gallery from '@/widgets/posts/ui/Gallery'
import Loader from '@/shared/ui/Loader'

export default function AllPostsList() {
  const [posts, setPosts] = useState<PostDto[]>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getFeed()
      .then((response) => {
        const { data } = response
        setPosts(data.posts)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return loading ? <Loader /> : posts && !loading ? <Gallery posts={posts} /> : <div>Пусто</div>
}
