import { z } from 'zod'

const registerSchema = z
  .object({
    username: z.string().min(4, 'username-small').max(64, 'username-long'),
    email: z.string().email('not-valid-email'),
    password: z.string().min(8, 'password-small'),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'password-no-match',
    path: ['repeatPassword'],
  })

type RegisterSchema = z.infer<typeof registerSchema>

const registerDefaultValues: RegisterSchema = {
  username: '',
  email: '',
  password: '',
  repeatPassword: '',
}

export { registerSchema, registerDefaultValues, type RegisterSchema }
