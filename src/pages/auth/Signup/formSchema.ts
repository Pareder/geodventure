import { z } from 'zod'

const formSchema = z
  .object({
    nickname: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(1, 'Required'),
    confirmPassword: z.string().min(1, 'Required'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })

export default formSchema
