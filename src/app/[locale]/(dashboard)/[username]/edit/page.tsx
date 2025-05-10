import PageLayout from '@/shared/ui/PageLayout'
import EditProfile from '@/widgets/editProfile/ui/EditProfile'
import { notFound } from 'next/navigation'
import { getProfile } from '@/shared/api/profile/api'

export default async function EditProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const { data } = await getProfile(username)

  if (!data) {
    notFound()
  }

  return (
    <PageLayout>
      <EditProfile profile={data} />
    </PageLayout>
  )
}
