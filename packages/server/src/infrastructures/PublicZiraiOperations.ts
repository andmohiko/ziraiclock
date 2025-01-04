import {
  CreatePublicZiraiDto,
  PublicZirai,
  publicZiraisCollection,
  UpdatePublicZiraiDto,
  ZiraiId
} from '~/entities/Zirai'
import { db, serverTimestamp } from '~/libs/firebase'
import { convertDate } from '~/utils/date'

const dateColumns = ['createdAt', 'updatedAt', 'useAt']

export const fetchAllPublicZiraisOperation = async (): Promise<
  Array<PublicZirai>
> => {
  const snapshot = await db.collection(publicZiraisCollection).get()
  return snapshot.docs.map((doc) => {
    return {
      publicZiraiId: doc.id,
      ...convertDate(doc.data(), dateColumns)
    } as PublicZirai
  })
}

export const createPublicZiraiOperation = async (
  ziraiId: ZiraiId,
  dto: CreatePublicZiraiDto
): Promise<void> => {
  await db.collection(publicZiraisCollection).doc(ziraiId).set(dto)
}

export const updatePublicZiraiOperation = async (
  ziraiId: ZiraiId,
  dto: UpdatePublicZiraiDto
): Promise<void> => {
  await db
    .collection(publicZiraisCollection)
    .doc(ziraiId)
    .update({
      ...dto,
      updatedAt: serverTimestamp
    })
}

export const deletePublicZiraiOperation = async (
  ziraiId: ZiraiId
): Promise<void> => {
  await db.collection(publicZiraisCollection).doc(ziraiId).delete()
}
