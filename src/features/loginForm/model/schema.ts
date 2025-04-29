import { z } from 'zod'

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
  rememberMe: z.boolean().default(false),
})

type LoginSchema = z.infer<typeof loginSchema>

const loginDefaultValues: LoginSchema = {
  username: '',
  password: '',
  rememberMe: false,
}

export { loginSchema, loginDefaultValues, type LoginSchema }
