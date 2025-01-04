import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { batchSchedule } from '~/constants'
import {
  fetchAllPublicZiraisOperation,
  updatePublicZiraiOperation
} from '~/infrastructures/PublicZiraiOperations'
import { createPublicUsedHistoryOperation } from '~/infrastructures/UsedHistoryOperations'
import { serverTimestamp } from '~/libs/firebase'
import { shuffleArray } from '~/utils/shuffle'

/**
 * 地雷女子を定期的に変更する
 */
const selectPublicZiraiBatch = functions.pubsub
  .schedule(batchSchedule)
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    try {
      const zirais = await fetchAllPublicZiraisOperation()
      const shuffledZirais = shuffleArray(zirais)
      const now = new Date()

      const ziraiId = shuffledZirais[0].publicZiraiId
      await updatePublicZiraiOperation(ziraiId, {
        updatedAt: serverTimestamp,
        useAt: now,
        usedCount: admin.firestore.FieldValue.increment(1)
      })
      await createPublicUsedHistoryOperation(ziraiId, {
        createdAt: serverTimestamp
      })
    } catch (e) {
      console.error(e)
    }
  })

export default selectPublicZiraiBatch
