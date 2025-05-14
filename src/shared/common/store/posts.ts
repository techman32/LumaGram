import { create } from 'zustand'
import { PostDto } from '@/shared/common/types/posts'

interface ProfilePostsState {
  posts: PostDto[]
  setPosts: (posts: PostDto[]) => void
  addPost: (post: PostDto) => void
  removePost: (id: string) => void
  updatePost: (updated: PostDto) => void
  toggleLike: (id: string, isLiked: boolean) => void
}

export const useProfilePostsStore = create<ProfilePostsState>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  removePost: (id) =>
    set((state) => ({
      posts: state.posts.filter((p) => p.id !== id),
    })),
  updatePost: (updated) =>
    set((state) => ({
      posts: state.posts.map((p) => (p.id === updated.id ? updated : p)),
    })),
  toggleLike: (id, isLiked) =>
    set((state) => ({
      posts: state.posts.map((p) =>
        p.id === id
          ? {
              ...p,
              isLiked,
              likeCount: isLiked ? p.likeCount + 1 : p.likeCount - 1,
            }
          : p,
      ),
    })),
}))
