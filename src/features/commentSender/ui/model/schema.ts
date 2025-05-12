import { z } from 'zod'

const commentSchema = z.object({
  text: z.string().max(255, 'message-long'),
})

type CommentSchema = z.infer<typeof commentSchema>

const commentDefaultValues: CommentSchema = {
  text: '',
}

export { commentSchema, commentDefaultValues, type CommentSchema }
