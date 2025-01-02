import { z } from 'zod'

export const ziraisCollection = 'zirais'

export type Zirai = {
  createdAt: Date
  uploadedImageUrl: string
  inputImageUrl: string
  twitterId: string
  updatedAt: Date
  useAt: Date
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
