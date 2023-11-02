import * as functions from 'firebase-functions'

import { dailyBatchSchedule } from '~/constants'
import {
  fetchAllZiraisOperation,
  updateZiraiOperation
} from '~/infrastructures/ZiraiOperations'
import { serverTimestamp } from '~/libs/firebase'
import { shuffleArray } from '~/utils/shuffle'

/**
 * 期限切れのチケットコードを無効にする
 */
const dailySelectZirai = functions.pubsub
  .schedule(dailyBatchSchedule)
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    try {
      const zirais = await fetchAllZiraisOperation()
      const shuffledZirais = shuffleArray(zirais)
      const now = new Date()
      updateZiraiOperation(shuffledZirais[0].ziraiId, {
        updatedAt: serverTimestamp,
        useAt: now
      })
    } catch (e) {
      console.error(e)
    }
  })

export default dailySelectZirai
