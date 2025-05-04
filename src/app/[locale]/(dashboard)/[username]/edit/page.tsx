import EditProfile from '@/widgets/editProfile/ui/EditProfile'
import ReturnButton from '@/features/returnButton/ui/ReturnButton'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function EditProfilePage() {
  const cookieStore = await cookies()
  const cookieUsername = cookieStore.get('username')?.value

  if (!cookieUsername) {
    notFound()
  }

  return (
    <div className="relative h-full overflow-scroll container mx-auto px-4">
      <div className="fixed top-16">
        <ReturnButton backUrl={`/${cookieUsername}`} />
      </div>
      <EditProfile />
    </div>
  )
}
