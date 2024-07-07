import { z } from 'zod';

export const FormSchema = z.object({
    email: z.string().email().trim(),
    password: z.string().min(6)
})
  
 export type FormProps = z.infer<typeof FormSchema>