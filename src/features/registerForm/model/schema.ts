import { z } from 'zod'

const registerSchema = z
  .object({
    username: z.string().min(4, 'username-small').max(32, 'username-long'),
    email: z.string().email('email-not-valid'),
    password: z.string().min(8, 'password-small'),
    repeatedPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatedPassword, {
    message: 'password-not-match',
    path: ['repeatedPassword'],
  })

type RegisterSchema = z.infer<typeof registerSchema>

const registerDefaultValues: RegisterSchema = {
  username: '',
  email: '',
  password: '',
  repeatedPassword: '',
}

export { registerSchema, registerDefaultValues, type RegisterSchema }
