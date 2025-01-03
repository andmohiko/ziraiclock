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
