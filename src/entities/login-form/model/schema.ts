import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(4, 'username-small').max(64, 'username-long'),
  password: z.string().min(8, 'password-small'),
  rememberMe: z.boolean().optional(),
})

type LoginSchema = z.infer<typeof loginSchema>

const loginDefaultValues: LoginSchema = {
  username: '',
  password: '',
  rememberMe: false,
}

export { loginSchema, loginDefaultValues, type LoginSchema }
