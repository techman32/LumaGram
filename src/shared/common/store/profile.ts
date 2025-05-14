import { create } from 'zustand'
import { ProfileDto } from '@/shared/common/types/profile'
import { followProfile, unfollowProfile } from '@/shared/api/profile/api'

interface ProfileHeaderState {
  profile: ProfileDto | null
  setProfile: (profile: ProfileDto) => void
  toggleFollow: () => void
}

export const useProfileHeaderStore = create<ProfileHeaderState>((set, get) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  toggleFollow: async () => {
    const { profile } = get()
    if (!profile) return

    const isFollowing = profile.followingStatus === 'followed'
    const newStatus = isFollowing ? 'notFollowed' : 'followed'
    const newFollowerCount = profile.followersCount + (isFollowing ? -1 : 1)

    set({
      profile: {
        ...profile,
        followingStatus: newStatus,
        followersCount: newFollowerCount,
      },
    })

    const res = isFollowing ? await unfollowProfile(profile.username) : await followProfile(profile.username)

    if (!res.success) {
      set({
        profile: {
          ...profile,
          followingStatus: profile.followingStatus,
          followersCount: profile.followersCount,
        },
      })
    }
  },
}))
