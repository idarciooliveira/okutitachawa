import { z } from 'zod';

export const RegisterCowSchema = z.object({
    raca: z.string().toUpperCase(),
    apelido: z.string(),
    tagId: z.string().toUpperCase(),
    genero: z.string(),
    peso: z.string(),
    tagIdMae: z.string().optional().default(''),
    tagIdPai: z.string().optional().default('')
})
  
 export type RegisterCowProps = z.infer<typeof RegisterCowSchema>