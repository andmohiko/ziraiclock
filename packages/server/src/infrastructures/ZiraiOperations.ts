import {
  UpdateZiraiDto,
  Zirai,
  ZiraiId,
  ziraisCollection
} from '~/entities/Zirai'
import { db, serverTimestamp } from '~/libs/firebase'
import { convertDate } from '~/utils/date'

const dateColumns = ['createdAt', 'updatedAt', 'useAt']

export const convertZiraiFromSnap = (
  docId: string,
  doc: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>
): Zirai => {
  return {
    ziraiId: docId,
    ...convertDate(doc.data(), dateColumns)
  } as Zirai
}

export const fetchAllZiraisOperation = async (): Promise<Array<Zirai>> => {
  const snapshot = await db.collection(ziraisCollection).get()
  return snapshot.docs.map((doc) => {
    return {
      ziraiId: doc.id,
      ...convertDate(doc.data(), dateColumns)
    } as Zirai
  })
}

export const updateZiraiOperation = async (
  ziraiId: ZiraiId,
  dto: UpdateZiraiDto
): Promise<void> => {
  await db
    .collection(ziraisCollection)
    .doc(ziraiId)
    .update({
      ...dto,
      updatedAt: serverTimestamp
    })
}
