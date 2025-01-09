import { getDocs, collection, query, orderBy, limit } from 'firebase/firestore'
import { firestore } from '../infrastructure/firebase'
import {
  publicZiraisCollection,
  Zirai,
  ziraisCollection
} from '../entities/Zirai'
import { convertDate } from '../../utils/convertDate'

const dateColumns = ['createdAt', 'useAt']

export const fetchZirai = async (): Promise<Zirai | undefined> => {
  const snapshot = await getDocs(
    query(
      collection(firestore, ziraisCollection),
      orderBy('useAt', 'desc'),
      limit(1)
    )
  )
  if (snapshot.docs.length === 0) {
    return undefined
  }

  const data = snapshot.docs[0]
  if (!data) {
    return undefined
  }
  return {
    ...convertDate(data.data(), dateColumns)
  } as Zirai
}

export const fetchPublicZirai = async (): Promise<Zirai | undefined> => {
  const snapshot = await getDocs(
    query(
      collection(firestore, publicZiraisCollection),
      orderBy('useAt', 'desc'),
      limit(1)
    )
  )
  if (snapshot.docs.length === 0) {
    return undefined
  }

  const data = snapshot.docs[0]
  if (!data) {
    return undefined
  }
  return {
    ...convertDate(data.data(), dateColumns)
  } as Zirai
}
