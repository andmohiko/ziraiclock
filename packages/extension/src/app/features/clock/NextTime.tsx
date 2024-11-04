import dayjs from 'dayjs'

export const NextTime = () => {
  const now = dayjs()
  // 0時, 3時, 6時, 9時, 12時, 15時, 18時, 21時までの残り時間を計算する
  const nextHour = Math.ceil(now.hour() / 3) * 3
  const nextTime = now.set('hour', nextHour).set('minute', 0).set('second', 0)
  const diff = nextTime.diff(now, 'second')
  const hours = Math.floor(diff / 3600)
  const minutes = Math.floor((diff % 3600) / 60)
  const timeString = `${String(hours).padStart(2, '0')}:${String(
    minutes
  ).padStart(2, '0')}`

  return (
    <p className="absolute bottom-4 right-4 text-[12px] text-white">
      {`次の地雷女子まで ${timeString}`}
    </p>
  )
}
