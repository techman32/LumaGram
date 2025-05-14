import { useTranslations } from 'next-intl'

type ProfileCountsProps = {
  postsCount: number
  followersCount?: number
  followingCount?: number
}

export default function ProfileCounts({ postsCount, followersCount, followingCount }: ProfileCountsProps) {
  const t = useTranslations('Profile')

  return (
    <div className="flex gap-2 font-semibold">
      <p>{t('posts-count', { postsCount })}</p>
      <p>{t('follower-count', { followersCount: followersCount ?? 0 })}</p>
      <p>{t('following-count', { followingCount: followingCount ?? 0 })}</p>
    </div>
  )
}
