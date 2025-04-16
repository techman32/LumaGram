import ProfileHeader from '@/entities/profile/ui/ProfileHeader'
import Posts from '@/entities/posts/ui/Posts'

export default async function ProfilePage() {
  return (
    <div className="flex flex-col mx-4 md:mx-[10%]">
      <ProfileHeader />
      <Posts />
    </div>
  )
}
