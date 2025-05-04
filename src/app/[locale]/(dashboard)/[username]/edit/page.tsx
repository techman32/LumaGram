import EditProfile from '@/widgets/editProfile/ui/EditProfile'
import ReturnButton from '@/features/returnButton/ui/ReturnButton'

export default async function EditProfilePage() {
  return (
    <div className="relative h-full overflow-scroll container mx-auto px-4">
      <div className="fixed top-16">
        <ReturnButton />
      </div>
      <EditProfile />
    </div>
  )
}
