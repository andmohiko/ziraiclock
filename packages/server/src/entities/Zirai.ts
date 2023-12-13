import * as admin from 'firebase-admin'
export const ziraisCollection = 'zirais'
export const usedHistoriesCollection = 'usedHistories'

export type ZiraiId = string

export type Zirai = {
  ziraiId: ZiraiId
  createdAt: Date
  imageUrl: string
  twitterId: string
  updatedAt: Date
  useAt: Date
  usedCount: number
}

export type UpdateZiraiDto = {
  updatedAt: admin.firestore.FieldValue
  useAt: Date
  usedCount: admin.firestore.FieldValue
}

export type UsedHistory = {
  createdAt: Date
}

export type CreateUsedHistoryDto = {
  createdAt: admin.firestore.FieldValue
}
