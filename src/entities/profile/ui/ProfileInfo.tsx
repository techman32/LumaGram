import ButtonSettings from '@/shared/ui/ButtonSettings'
import Button from '@/shared/ui/Button'

export default function ProfileInfo() {
  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <div className="flex gap-4 md:gap-6 items-center">
        <h2 className="font-bold md:text-lg">johndoe</h2>
        <Button appearance="secondary" className="font-medium">Edit Profile</Button>
        <ButtonSettings />
      </div>
      <div className="flex gap-2 md:gap-6 text-sm">
        <p className="font-semibold">234 posts</p>
        <p className="font-semibold">14.7k followers</p>
        <p className="font-semibold">892 following</p>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <p className="font-bold">John Doe</p>
        <p className="font-medium">Digital Creator</p>
        <p className="font-medium">Creating memories and photo at a time</p>
      </div>
    </div>
  )
}
