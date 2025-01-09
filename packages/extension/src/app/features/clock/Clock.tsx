import { RiTwitterXFill } from 'react-icons/ri'
import { usePublicZirai } from './hooks'
import { Time } from './Time'
import { NextTime } from './NextTime'

export const Clock = () => {
  const [zirai, loading, error] = usePublicZirai()

  const twitterId = zirai?.twitterId
  const imageUrl = zirai?.imageUrl
  const placeHolderImageUrl = '/images/zirai/20230811_015629.jpg'
  const backgroundImageUrl = error ? placeHolderImageUrl : imageUrl

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`
      }}
    >
      <Time />
      <NextTime />
      {twitterId && (
        <a
          href={`https://twitter.com/${twitterId}`}
          target="_blank"
          rel="noreferrer"
          className="absolute bottom-4 flex justify-center items-center gap-2 text-[18px] text-white"
        >
          <RiTwitterXFill />
          {`@${twitterId}`}
        </a>
      )}
      <a
        href="https://andmohiko.dev"
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-4 right-4 text-[12px] text-white"
      >
        地雷時計
      </a>
    </div>
  )
}
