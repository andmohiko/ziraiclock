import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'

export const NextTime = () => {
  const [nowDate, setNowDate] = useState<Date>(new Date())
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (intervalId) return
    const id = setInterval(() => {
      setNowDate(new Date())
    }, 1000)
    setIntervalId(id)
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const timeString = useMemo(() => {
    const now = dayjs(nowDate)
    // 0時, 3時, 6時, 9時, 12時, 15時, 18時, 21時までの残り時間を計算する
    let nextHour = Math.ceil((now.hour() + 1) / 3) * 3

    // 24時（深夜0時）を超える場合は翌日の0時に設定
    if (nextHour >= 24) {
      nextHour = 0
    }

    const nextTime = now
      .add(nextHour <= now.hour() ? 1 : 0, 'day')
      .set('hour', nextHour)
      .set('minute', 0)
      .set('second', 0)
    const diff = nextTime.diff(now, 'second')
    const hours = Math.floor(diff / 3600)
    const minutes = Math.floor((diff % 3600) / 60)
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}`
  }, [nowDate])

  return (
    <p className="absolute bottom-4 left-4 text-[12px] text-white">
      {`次の地雷女子まで ${timeString}`}
    </p>
  )
}
