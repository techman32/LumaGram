import EditProfileForm from '@/features/editProfileForm/ui/EditProfileForm'
import EditUsernameForm from '@/features/editUsernameForm/ui/EditUsernameForm'
import EditPhoto from '@/features/editPhoto/ui/EditPhoto'
import { ProfileBody } from '@/shared/lib/types/profile'

export default async function EditProfile({ profile }: { profile: ProfileBody }) {
  const { username, image, ...rest } = profile

  return (
    <div className="border border-gray-200 dark:border-white/20 rounded-md p-8 max-w-md mx-auto my-4 flex flex-col gap-8">
      <EditPhoto image={image} />
      <EditUsernameForm username={username} />
      <EditProfileForm profile={rest} />
    </div>
  )
}
