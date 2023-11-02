import { z } from 'zod'

export const ziraisCollection = 'zirais'

export type Zirai = {
  createdAt: Date
  imageUrl: string
  twitterId: string
  useAt: Date
}

export const EditZiraiSchema = z.object({
  imageUrls: z.array(z.string()).min(1).max(1),
  twitterId: z.string().optional()
})

export type EditZiraiInputType = z.infer<typeof EditZiraiSchema>
