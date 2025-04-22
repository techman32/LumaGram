import ProfileInfo from '@/entities/profile/ui/ProfileInfo'
import ProfileAvatar from '@/entities/profile/ui/ProfileAvatar'
import { Profile } from '@/shared/lib/types'

export default function ProfileHeader({profileData}: {profileData: Profile}) {
  return (
    <div className="flex border-b border-gray-200 dark:border-white/10 my-[4%] md:my-[2%] gap-4 md:gap-8 pb-[2%]">
      <ProfileAvatar />
      <ProfileInfo username={profileData.username} postsCount={profileData.postsCount} />
    </div>
  )
}
