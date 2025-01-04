import * as functions from 'firebase-functions/v1'

import { isPrivate, isPublic } from '~/entities/Zirai'
import {
  createPublicZiraiOperation,
  deletePublicZiraiOperation
} from '~/infrastructures/PublicZiraiOperations'
import { convertZiraiFromSnap } from '~/infrastructures/ZiraiOperations'
import { serverTimestamp } from '~/libs/firebase'
import { triggerOnce } from '~/utils/triggerOnce'

const onUpdateZirai = functions
  .region('asia-northeast1')
  .runWith({
    memory: '1GB' as const
  })
  .firestore.document('/zirais/{ziraiId}')
  .onUpdate(
    triggerOnce('onUpdateZirai', async (snap, context) => {
      const ziraiId = context.params.ziraiId
      const oldValue = convertZiraiFromSnap(ziraiId, snap.before)
      const newValue = convertZiraiFromSnap(ziraiId, snap.after)

      // 非公開だったものが公開されたとき
      if (
        isPrivate(oldValue.publishStatus) &&
        isPublic(newValue.publishStatus)
      ) {
        await createPublicZiraiOperation(ziraiId, {
          createdAt: serverTimestamp,
          imageUrl: newValue.imageUrl,
          publishStatus: newValue.publishStatus,
          twitterId: newValue.twitterId,
          updatedAt: serverTimestamp,
          useAt: null,
          usedCount: 0
        })
      }

      // 公開だったものが非公開になったとき
      if (
        isPublic(oldValue.publishStatus) &&
        isPrivate(newValue.publishStatus)
      ) {
        await deletePublicZiraiOperation(ziraiId)
      }
    })
  )

export default onUpdateZirai
