import { z } from 'zod';

export const RegisterCowSchema = z.object({
    raca: z.string().toUpperCase(),
    apelido: z.string(),
    tagId: z.string().toUpperCase(),
    genero: z.string(),
    peso: z.string(),
    dataDeNascimento: z.string(),
    tagIdMae: z.string(),
    tagIdPai: z.string()
})
  
 export type RegisterCowProps = z.infer<typeof RegisterCowSchema>