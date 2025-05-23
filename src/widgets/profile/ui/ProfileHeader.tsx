import { ProfileDto } from '@/shared/common/types/profile'
import Photo from '@/shared/ui/Photo'
import Button from '@/shared/ui/Button'
import Link from 'next/link'
import ProfileCounts from '@/features/profileInfo/ui/ProfileCounts'
import { getCurrentUsername } from '@/shared/api/auth/api'
import { getTranslations } from 'next-intl/server'

export default async function ProfileHeader({ profile }: { profile: ProfileDto }) {
  const t = await getTranslations('Profile')
  const { success, data } = await getCurrentUsername()

  return (
    <div className="mt-4 pb-4 gap-4 flex flex-col items-center border-b border-gray-200 dark:border-white/20 sm:items-start sm:flex-row sm:gap-8 sm:mt-8 sm:pb-8">
      <Photo src={profile.image ? `http://localhost:8000/${profile.image.url}` : ''} />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">{profile.username}</h2>
          {success && data.username === profile.username && (
            <Link href={`/${profile.username}/edit`}>
              <Button appearance="secondary" size="small">
                {t('edit-button')}
              </Button>
            </Link>
          )}
        </div>
        <ProfileCounts
          postsCount={profile.postsCount}
          followerCount={profile.followerCount}
          followingCount={profile.followingCount}
        />
        <div className="flex flex-col gap-1">
          <p className="font-medium">{profile.name}</p>
          <p className="text-sm opacity-80">{profile.activityCategory}</p>
          <p>{profile.description}</p>
        </div>
      </div>
    </div>
  )
}
