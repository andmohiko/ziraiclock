import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

export const Time = () => {
  const [now, setNow] = useState<Date>(new Date())
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (intervalId) return
    const id = setInterval(() => {
      setNow(new Date())
    }, 1000)
    setIntervalId(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <p className="text-[162px] text-white font-bold mb-12">
      {dayjs(now).format('HH:mm:ss')}
    </p>
  )
}
