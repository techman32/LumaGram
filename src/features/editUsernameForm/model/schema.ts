import { z } from 'zod'

const editUsernameSchema = z.object({
  username: z.string(),
})

type EditUsernameSchema = z.infer<typeof editUsernameSchema>

const editUsernameDefaultValues: EditUsernameSchema = {
  username: '',
}

export { editUsernameSchema, editUsernameDefaultValues, type EditUsernameSchema }
