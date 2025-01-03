import { z } from 'zod'

export const ziraisCollection = 'zirais'

export type PublishStatus = 'draft' | 'published' | 'unauthorized' | 'withdrawn'

export type Zirai = {
  createdAt: Date
  imageUrl: string
  publishStatus: PublishStatus
  twitterId: string
  updatedAt: Date
  useAt: Date
  usedCount: number
}

export const EditZiraiSchema = z.object({
  uploadedImageUrl: z.string().optional(),
  inputImageUrl: z.string().optional(),
  tweetUrl: z.string().optional(),
  twitterId: z.string().optional()
})

export type EditZiraiInputType = z.infer<typeof EditZiraiSchema>

export const AddMultipleZiraisSchema = z.object({
  imageUrls: z.array(z.string()).min(1).max(100)
})

export type AddMultipleZiraisInputType = z.infer<typeof AddMultipleZiraisSchema>
