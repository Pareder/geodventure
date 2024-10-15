import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Required'),
})

export default formSchema
