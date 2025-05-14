import Button from '@/shared/ui/Button'
import { useProfileHeaderStore } from '@/shared/common/store/profile'

export default function ProfileActions() {
  const { profile, toggleFollow } = useProfileHeaderStore()

  if (!profile || profile.followingStatus === null) return null

  return (
    <div>
      <Button
        appearance={profile.followingStatus === 'notFollowed' ? 'primary' : 'secondary'}
        size="small"
        onClick={toggleFollow}
      >
        {profile.followingStatus === 'notFollowed' ? 'Подписаться' : 'Отписаться'}
      </Button>
    </div>
  )
}
