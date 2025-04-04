import ProfileInfo from '@/entities/profile/ui/ProfileInfo'
import ProfileAvatar from '@/entities/profile/ui/ProfileAvatar'

export default function ProfileHeader() {
  return (
    <div className="flex border-b border-gray-200 my-[4%] md:my-[2%] gap-4 md:gap-8 pb-[2%]">
      <ProfileAvatar />
      <ProfileInfo />
    </div>
  )
}
