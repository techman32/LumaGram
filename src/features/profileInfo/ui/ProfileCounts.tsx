import { getTranslations } from 'next-intl/server'

type ProfileCountsProps = {
  postsCount: number
  followerCount?: number
  followingCount?: number
}

export default async function ProfileCounts({ postsCount, followerCount, followingCount }: ProfileCountsProps) {
  const t = await getTranslations('Profile')

  return (
    <div className="flex gap-2 font-semibold">
      <p>{t('posts-count', { postsCount })}</p>
      <p>{t('follower-count', { followerCount: followerCount ?? 0 })}</p>
      <p>{t('following-count', { followingCount: followingCount ?? 0 })}</p>
    </div>
  )
}
