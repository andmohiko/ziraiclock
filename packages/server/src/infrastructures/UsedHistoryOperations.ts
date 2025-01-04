import {
  CreateUsedHistoryDto,
  ZiraiId,
  publicZiraisCollection,
  usedHistoriesCollection,
  ziraisCollection
} from '~/entities/Zirai'
import { db } from '~/libs/firebase'

export const createUsedHistoryOperation = async (
  ziraiId: ZiraiId,
  dto: CreateUsedHistoryDto
): Promise<void> => {
  await db
    .collection(ziraisCollection)
    .doc(ziraiId)
    .collection(usedHistoriesCollection)
    .add(dto)
}

export const createPublicUsedHistoryOperation = async (
  ziraiId: ZiraiId,
  dto: CreateUsedHistoryDto
): Promise<void> => {
  await db
    .collection(publicZiraisCollection)
    .doc(ziraiId)
    .collection(usedHistoriesCollection)
    .add(dto)
}
