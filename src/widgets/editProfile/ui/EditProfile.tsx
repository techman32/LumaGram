import EditProfileForm from '@/features/editProfileForm/ui/EditProfileForm'
import EditUsernameForm from '@/features/editUsernameForm/ui/EditUsernameForm'
import { cookies } from 'next/headers'
import EditPhoto from '@/features/editPhoto/ui/EditPhoto'

export default async function EditProfile() {
  const cookieStore = await cookies()
  const cookieUsername = cookieStore.get('username')?.value

  return (
    <div className="border border-gray-200 dark:border-white/20 rounded-md p-8 max-w-md mx-auto my-4 flex flex-col gap-8">
      <EditPhoto />
      {cookieUsername && <EditUsernameForm username={cookieUsername} />}
      <EditProfileForm />
    </div>
  )
}
