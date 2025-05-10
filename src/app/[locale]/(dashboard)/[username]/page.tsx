import { getProfile } from '@/shared/api/profile/api'
import ProfileHeader from '@/widgets/profile/ui/ProfileHeader'
import Gallery from '@/widgets/posts/ui/Gallery'
import { getPosts } from '@/shared/api/posts/api'

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const { data } = await getProfile(username)
  const d = await getPosts(username)
  console.log(d)

  return (
    <div className="h-full overflow-scroll container mx-auto px-4">
      {data ? (
        <ProfileHeader profile={data} />
      ) : (
        <div className="h-full flex flex-col justify-center items-center">Пользователь не найден</div>
      )}
    </div>
  )
}
