import { useEffect, useState } from 'react'
import { Zirai } from '../../entities/Zirai'
import {
  fetchPublicZirai,
  fetchZirai
} from '../../infrastructure/ZiraiOperations'
import { errorMessage } from '../../../utils/errorMessage'

export const useZirai = (): [
  Zirai | undefined,
  boolean,
  string | undefined
] => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [zirai, setZirai] = useState<Zirai | undefined>(undefined)

  useEffect(() => {
    const func = async () => {
      if (zirai) {
        return
      }

      try {
        console.log('fetching zirai')
        setLoading(true)
        const data = await fetchZirai()
        setZirai(data)
      } catch (e) {
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    func()
  }, [])

  return [zirai, loading, error]
}

export const usePublicZirai = (): [
  Zirai | undefined,
  boolean,
  string | undefined
] => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const [zirai, setZirai] = useState<Zirai | undefined>(undefined)

  useEffect(() => {
    const func = async () => {
      if (zirai) {
        return
      }

      try {
        console.log('fetching zirai')
        setLoading(true)
        const data = await fetchPublicZirai()
        setZirai(data)
      } catch (e) {
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    func()
  }, [])

  return [zirai, loading, error]
}
