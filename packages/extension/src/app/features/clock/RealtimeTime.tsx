import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

type Props = {
  date: Date
  format?: string
}

export const RealtimeTime = ({ date, format = 'HH:mm:ss' }: Props) => {
  const [now, setNow] = useState<Date>(date)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (intervalId) return
    const id = setInterval(() => {
      setNow(new Date())
    }, 1000)
    setIntervalId(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <>{dayjs(now).format(format)}</>
}
