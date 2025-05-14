'use client'
import { ProfileDto } from '@/shared/common/types/profile'
import Photo from '@/shared/ui/Photo'
import Button from '@/shared/ui/Button'
import Link from 'next/link'
import ProfileCounts from '@/features/profileInfo/ui/ProfileCounts'
import ProfileActions from '@/features/profileActions/ui/ProfileActions'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { useProfileHeaderStore } from '@/shared/common/store/profile'
import { getCurrentUsername } from '@/shared/api/auth/api'

export default function ProfileHeader({ profile }: { profile: ProfileDto }) {
  const t = useTranslations('Profile')
  const [currentUsername, setCurrentUsername] = useState<string>('')
  const { profile: storeProfile, setProfile } = useProfileHeaderStore()

  useEffect(() => {
    getCurrentUsername().then((res) => {
      if (res.success) {
        setCurrentUsername(res.data.username)
      }
    })

    setProfile(profile)
  }, [profile])

  if (!storeProfile) return null

  return (
    <div className="mt-4 pb-4 gap-4 flex flex-col items-center border-b border-gray-200 dark:border-white/20 sm:items-start sm:flex-row sm:gap-8 sm:mt-8 sm:pb-8">
      <Photo src={profile.image ? `http://localhost:8000/${profile.image.url}` : ''} />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold">{profile.username}</h2>
          {currentUsername === profile.username && (
            <Link href={`/${profile.username}/edit`}>
              <Button appearance="secondary" size="small">
                {t('edit-button')}
              </Button>
            </Link>
          )}
        </div>
        <ProfileCounts
          postsCount={storeProfile.postsCount}
          followersCount={storeProfile.followersCount}
          followingCount={storeProfile.followingCount}
        />
        <div className="flex flex-col gap-1">
          {profile.name && <p className="font-medium">{profile.name}</p>}
          {profile.activityCategory && <p className="text-sm opacity-80">{profile.activityCategory}</p>}
          {profile.description && <p>{profile.description}</p>}
        </div>
        <ProfileActions />
      </div>
    </div>
  )
}
