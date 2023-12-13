import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { batchSchedule } from '~/constants'
import { createUsedHistoryOperation } from '~/infrastructures/UsedHistoryOperations'
import {
  fetchAllZiraisOperation,
  updateZiraiOperation
} from '~/infrastructures/ZiraiOperations'
import { serverTimestamp } from '~/libs/firebase'
import { shuffleArray } from '~/utils/shuffle'

/**
 * 期限切れのチケットコードを無効にする
 */
const selectZiraiBatch = functions.pubsub
  .schedule(batchSchedule)
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    try {
      const zirais = await fetchAllZiraisOperation()
      const shuffledZirais = shuffleArray(zirais)
      const now = new Date()

      const ziraiId = shuffledZirais[0].ziraiId
      await updateZiraiOperation(ziraiId, {
        updatedAt: serverTimestamp,
        useAt: now,
        usedCount: admin.firestore.FieldValue.increment(1)
      })
      await createUsedHistoryOperation(ziraiId, {
        createdAt: serverTimestamp
      })
    } catch (e) {
      console.error(e)
    }
  })

export default selectZiraiBatch
