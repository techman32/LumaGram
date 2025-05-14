import { create } from 'zustand'
import { CommentDto } from '@/shared/common/types/comment'

interface CommentsState {
  commentsByPostId: Record<string, CommentDto[]>
  hasMoreByPostId: Record<string, boolean>
  setComments: (postId: string, comments: CommentDto[]) => void
  appendComments: (postId: string, comments: CommentDto[]) => void
  addComment: (postId: string, comment: CommentDto) => void
  clearComments: (postId: string) => void
  setHasMore: (postId: string, hasMore: boolean) => void
}

export const useCommentsStore = create<CommentsState>((set) => ({
  commentsByPostId: {},
  hasMoreByPostId: {},

  setComments: (postId, comments) =>
    set((state) => ({
      commentsByPostId: {
        ...state.commentsByPostId,
        [postId]: comments,
      },
    })),

  appendComments: (postId, newComments) =>
    set((state) => ({
      commentsByPostId: {
        ...state.commentsByPostId,
        [postId]: [...(state.commentsByPostId[postId] ?? []), ...newComments],
      },
    })),

  addComment: (postId, comment) => {
    set((state) => ({
      commentsByPostId: {
        ...state.commentsByPostId,
        [postId]: [comment, ...(state.commentsByPostId[postId] || [])],
      },
    }))
  },

  clearComments: (postId) =>
    set((state) => {
      const { [postId]: _, ...rest } = state.commentsByPostId
      const { [postId]: __, ...hasMoreRest } = state.hasMoreByPostId
      return {
        commentsByPostId: rest,
        hasMoreByPostId: hasMoreRest,
      }
    }),

  setHasMore: (postId, hasMore) =>
    set((state) => ({
      hasMoreByPostId: {
        ...state.hasMoreByPostId,
        [postId]: hasMore,
      },
    })),
}))
