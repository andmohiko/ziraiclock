import dayjs from 'dayjs';
import { RiTwitterXFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { useZirai } from './hooks';

export const Clock = () => {
  const [now, setNow] = useState<Date>(new Date());
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [zirai, loading, error] = useZirai();

  const twitterId = zirai?.twitterId;
  const imageUrl = zirai?.imageUrl;
  const placeHolderImageUrl = '/images/zirai/20230811_015629.jpg';
  const backgroundImageUrl = error ? placeHolderImageUrl : imageUrl;

  useEffect(() => {
    if (intervalId) return;
    const id = setInterval(() => {
      setNow(new Date());
    }, 1000);
    setIntervalId(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
      }}
    >
      <p className="text-[162px] text-white font-bold mb-12">{dayjs(now).format('HH:mm:ss')}</p>
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
  );
};
