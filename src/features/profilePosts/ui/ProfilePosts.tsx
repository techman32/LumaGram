import Gallery from '@/widgets/posts/ui/Gallery'
import { getProfilePosts } from '@/shared/api/posts/api'

type ProfilePostsProps = {
  username: string
}

export default async function ProfilePosts({ username }: ProfilePostsProps) {
  const { data } = await getProfilePosts(username)
  return <Gallery posts={data.posts} />
}
