import { create } from 'zustand'
import { CommentDto } from '@/shared/common/types/comment'

interface CommentsState {
  commentsByPostId: Record<string, CommentDto[]>
  setComments: (postId: string, comments: CommentDto[]) => void
  addComment: (postId: string, comment: CommentDto) => void
  clearComments: (postId: string) => void
}

export const useCommentsStore = create<CommentsState>((set) => ({
  commentsByPostId: {},
  setComments: (postId, comments) =>
    set((state) => ({
      commentsByPostId: {
        ...state.commentsByPostId,
        [postId]: comments,
      },
    })),
  addComment: (postId, comment) =>
    set((state) => ({
      commentsByPostId: {
        ...state.commentsByPostId,
        [postId]: [...(state.commentsByPostId[postId] || []), comment],
      },
    })),
  clearComments: (postId) =>
    set((state) => {
      const newMap = { ...state.commentsByPostId }
      delete newMap[postId]
      return { commentsByPostId: newMap }
    }),
}))
