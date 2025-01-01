import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useEffect, useMemo, useState } from 'react'
import { Zirai, ziraisCollection } from '~/entities/Zirai'
import { db } from '~/lib/firebase'

export const useZirais = (): {
  zirais: Zirai[]
  ziraiCount: number
  uniqueUserCount: number
} => {
  const [zirais, setZirais] = useState<Zirai[]>([])

  useEffect(() => {
    const func = async () => {
      const snap = await getDocs(
        query(collection(db, ziraisCollection), orderBy('createdAt', 'desc'))
      )
      const zirais = snap.docs.map((doc) => {
        return {
          ...doc.data()
        } as Zirai
      })
      setZirais(zirais)
    }
    func()
  }, [])

  const uniqueUsersIds = useMemo(() => {
    const userIds = zirais.map((zirai) => zirai.twitterId)
    return Array.from(new Set(userIds))
  }, [zirais])

  return {
    zirais,
    ziraiCount: zirais.length,
    uniqueUserCount: uniqueUsersIds.length
  }
}
