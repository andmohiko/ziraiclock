/* eslint-disable @typescript-eslint/no-explicit-any */
import * as admin from 'firebase-admin'
import { EventContext } from 'firebase-functions'

import { db, serverTimestamp } from '~/libs/firebase'

const hasAlreadyTriggered = (
  eventID: string,
  suffix: string,
): Promise<boolean> => {
  const id = [eventID, suffix].join('-')
  return db.runTransaction(async (t) => {
    const ref = admin.firestore().collection('triggerEvents').doc(id)
    const doc = await t.get(ref)
    if (doc.exists) {
      console.log(`EventID: ${id} has already triggered.`)
      return true
    } else {
      t.set(ref, { createTime: serverTimestamp })
      return false
    }
  })
}

export const triggerOnce =
  <T>(
    suffix: string,
    handler: (data: T, context: EventContext) => PromiseLike<any> | any,
  ): ((data: T, context: EventContext) => PromiseLike<any> | any) =>
  async (data, context) => {
    if (await hasAlreadyTriggered(context.eventId, suffix)) {
      return undefined
    }
    return handler(data, context)
  }
