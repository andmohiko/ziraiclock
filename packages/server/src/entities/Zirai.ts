import * as admin from 'firebase-admin'
export const ziraisCollection = 'zirais'

export type ZiraiId = string

export type Zirai = {
  ziraiId: ZiraiId
  createdAt: Date
  imageUrl: string
  twitterId: string
  updatedAt: Date
  useAt: Date
}

export type UpdateZiraiDto = {
  updatedAt: admin.firestore.FieldValue
  useAt: Date
}
