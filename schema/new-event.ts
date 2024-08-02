
import { z } from 'zod';

export const NewEventSchema = z.object({
    name: z.string(),
   nota: z.string(),
})
  
 export type NewEventProps = z.infer<typeof NewEventSchema>