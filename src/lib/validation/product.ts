import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().trim().min(1).max(100),
  description: z.string().trim().min(1).max(1000),
  price: z.coerce.number().finite().positive().refine((v) => Number.isInteger(v * 100), 'Máximo dos decimales')
})

export const imageSchema = z.object({
  type: z.enum(['image/jpeg', 'image/png', 'image/webp']),
  size: z.number().max(5 * 1024 * 1024)
})

export type ProductInput = z.infer<typeof productSchema>
