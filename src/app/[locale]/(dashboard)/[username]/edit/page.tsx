import EditProfile from '@/widgets/editProfile/ui/EditProfile'
import ReturnButton from '@/features/returnButton/ui/ReturnButton'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { getProfile } from '@/shared/api/profile/api'

export default async function EditProfilePage() {
  const cookieStore = await cookies()
  const cookieUsername = cookieStore.get('username')?.value

  if (!cookieUsername) {
    notFound()
  }

  const { data } = await getProfile(cookieUsername)

  if (!data) {
    notFound()
  }

  return (
    <div className="relative h-full overflow-scroll container mx-auto px-4">
      <div className="fixed top-16">
        <ReturnButton backUrl={`/${cookieUsername}`} />
      </div>
      <EditProfile profile={data} />
    </div>
  )
}
