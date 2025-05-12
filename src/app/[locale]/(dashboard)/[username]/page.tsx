import { getProfile } from '@/shared/api/profile/api'
import ProfileHeader from '@/widgets/profile/ui/ProfileHeader'
import PageLayout from '@/shared/ui/PageLayout'
import ProfilePosts from '@/features/profilePosts/ui/ProfilePosts'

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const { data } = await getProfile(username)

  return (
    <PageLayout>
      {data ? (
        <>
          <ProfileHeader profile={data} />
          <ProfilePosts username={username} />
        </>
      ) : (
        <div className="h-full flex flex-col justify-center items-center">Пользователь не найден</div>
      )}
    </PageLayout>
  )
}
