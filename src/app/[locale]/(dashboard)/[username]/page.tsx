import { getProfile } from '@/shared/api/profile/api'
import ProfileHeader from '@/widgets/profile/ui/ProfileHeader'

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const { data } = await getProfile(username)

  return (
    <div className="h-full overflow-scroll container mx-auto px-4">
      {data ? (
        <ProfileHeader username={data.username} isPublic={data.isPublic} postsCount={data.postsCount} />
      ) : (
        <div className="h-full flex flex-col justify-center items-center">Пользователь не найден</div>
      )}
    </div>
  )
}
