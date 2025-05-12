import { z } from 'zod'

const editProfileSchema = z.object({
  name: z.string().max(32, 'name-long').optional(),
  description: z.string().max(120, 'description-long').optional(),
  activityCategory: z.string().max(40, 'category-long').optional(),
  isPublic: z.boolean().default(true),
})

type EditProfileSchema = z.infer<typeof editProfileSchema>

const editProfileDefaultValues: EditProfileSchema = {
  name: '',
  description: '',
  activityCategory: '',
  isPublic: true,
}

export { editProfileSchema, editProfileDefaultValues, type EditProfileSchema }
