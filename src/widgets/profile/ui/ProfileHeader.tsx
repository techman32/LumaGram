import { ProfileBody } from '@/shared/lib/types/profile'
import Photo from '@/shared/ui/Photo'
import Button from '@/shared/ui/Button'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function ProfileHeader(profile: ProfileBody) {
  const cookieStore = await cookies()
  const usernameCookie = cookieStore.get('username')?.value

  return (
    <div className="my-4 gap-4 flex flex-col items-center sm:flex-row sm:gap-8 sm:my-8">
      <Photo size={128} src={profile.image} />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">{profile.username}</h2>
          {usernameCookie === profile.username && (
            <Link href={`/${usernameCookie}/edit`}>
              <Button appearance="secondary" size="small">
                Редактировать
              </Button>
            </Link>
          )}
        </div>
        <div className="flex gap-2 font-semibold">
          <p>{profile.postsCount} posts</p>
          <p>{profile.followerCount ?? 0} followers</p>
          <p>{profile.followingCount ?? 0} following</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">{profile.name ?? 'John Doe'}</p>
          <p className="text-sm opacity-80">{profile.activityCategory ?? 'Designer'}</p>
          <p>{profile.description ?? 'Простой человек с большой душой.'}</p>
        </div>
      </div>
    </div>
  )
}
