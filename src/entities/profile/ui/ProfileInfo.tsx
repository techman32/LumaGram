import Button from '@/shared/ui/Button'
import { Link } from '@/i18n/routing'

export default function ProfileInfo({ username, postsCount }: { username: string; postsCount: number }) {
  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <div className="flex gap-4 md:gap-6 items-center">
        <h2 className="font-bold md:text-lg dark:text-white">{username}</h2>
        <Link href="/profile/edit">
          <Button appearance="secondary" className="font-medium">
            Edit Profile
          </Button>
        </Link>
      </div>
      <div className="flex gap-2 md:gap-6 text-sm">
        <p className="font-semibold dark:text-white">{postsCount} posts</p>
        <p className="font-semibold dark:text-white">14.7k followers</p>
        <p className="font-semibold dark:text-white">892 following</p>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <p className="font-bold dark:text-white">John Doe</p>
        <p className="font-medium dark:text-white">Digital Creator</p>
        <p className="font-medium dark:text-white">Creating memories and photo at a time</p>
      </div>
    </div>
  )
}
