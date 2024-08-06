import { z } from 'zod';

export const FormSchema = z.object({
    email: z.string().email().trim(),
    password: z.string().min(6)
})
  
 export type FormProps = z.infer<typeof FormSchema>

 export const SignUpSchema = z.object({
    email: z.string().email().trim(),
    password: z.string().min(6),
    telefone: z.string(),
    name: z.string(),
    type: z.string().optional().default('admin')
})
  
 export type SignUpProps = z.infer<typeof SignUpSchema>