import { z } from 'zod'

const editProfileSchema = z.object({
  name: z.string().max(32, 'name-long'),
  description: z.string().max(120, 'description-long'),
  category: z.string().max(40, 'category-long'),
  isPublic: z.boolean().default(false),
})

type EditProfileSchema = z.infer<typeof editProfileSchema>

const editProfileDefaultValues: EditProfileSchema = {
  name: '',
  description: '',
  category: '',
  isPublic: false,
}

export { editProfileSchema, editProfileDefaultValues, type EditProfileSchema }
