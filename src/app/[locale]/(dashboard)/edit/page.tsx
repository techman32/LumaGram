'use client'
import ProfileAvatar from '@/entities/profile/ui/ProfileAvatar'
import Button from '@/shared/ui/Button'
import Input from '@/shared/ui/Input'
import TextArea from '@/shared/ui/TextArea'
import Dropdown from '@/shared/ui/Dropdown'
import Toggle from '@/shared/ui/Toggle'

export default function EditProfilePage() {
  return (
    <div className="h-screen">
      <div className="mx-[20%] my-4 p-8 bg-white dark:bg-black/10 rounded-lg not-dark:shadow-sm dark:border dark:border-white/10">
        <div className="flex gap-6 items-center mb-4">
          <ProfileAvatar />
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-xl">johndoe</h2>
            <Button appearance="secondary">Change Profile Name</Button>
          </div>
        </div>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Full Name</h2>
            <Input block placeholder="Enter full name" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Username</h2>
            <Input block placeholder="Enter username" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Bio</h2>
            <TextArea placeholder="Enter your bio" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Profile Type</h2>
            <Dropdown
              list={[
                { id: '1', name: 'first' },
                { id: '2', name: 'second' },
                { id: '3', name: 'third' },
              ]}
              selected={{ id: '3', name: 'third' }}
              displayKey={'name'}
              valueKey={'id'}
              handleChoice={(v) => console.log(v)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Private account</h2>
            <Toggle />
          </div>
          <div className="flex gap-4 mt-4">
            <Button appearance={'primary'}>Save Changes</Button>
            <Button appearance={'secondary'}>Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
