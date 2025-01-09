import { RealtimeTime } from './RealtimeTime'

export const NowTime = () => {
  const now = new Date()
  return (
    <p className="text-[162px] text-white font-bold mb-12">
      <RealtimeTime date={now} />
    </p>
  )
}
