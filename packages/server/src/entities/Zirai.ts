import { FieldValue } from 'firebase-admin/firestore'

export const ziraisCollection = 'zirais'
export const publicZiraisCollection = 'publicZirais'
export const usedHistoriesCollection = 'usedHistories'

export type ZiraiId = string

export type PublishStatus = 'draft' | 'published' | 'unauthorized' | 'withdrawn'

export type Zirai = {
  ziraiId: ZiraiId
  createdAt: Date
  imageUrl: string
  publishStatus: PublishStatus
  twitterId: string
  updatedAt: Date
  useAt: Date
  usedCount: number | null
}

export type UpdateZiraiDto = {
  updatedAt: FieldValue
  useAt: Date
  usedCount: FieldValue
}

export type UsedHistory = {
  createdAt: Date
}

export type CreateUsedHistoryDto = {
  createdAt: FieldValue
}

export type PublicZirai = {
  publicZiraiId: ZiraiId
  createdAt: Date
  imageUrl: string
  publishStatus: PublishStatus
  twitterId: string
  updatedAt: Date
  useAt: Date | null
  usedCount: number
}

export type CreatePublicZiraiDto = Omit<
  PublicZirai,
  'publicZiraiId' | 'createdAt' | 'updatedAt'
> & {
  createdAt: FieldValue
  updatedAt: FieldValue
}

export type UpdatePublicZiraiDto = {
  updatedAt: FieldValue
  useAt: Date
  usedCount: FieldValue
}

export const publicStatuses = ['published', 'unauthorized']

export const privateStatuses = ['draft', 'withdrawn']

export const isPublic = (status: PublishStatus): boolean => {
  return status === 'published' || status === 'unauthorized'
}

export const isPrivate = (status: PublishStatus): boolean => {
  return status === 'draft' || status === 'withdrawn'
}
