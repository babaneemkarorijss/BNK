'use client';
import { useRouter } from 'next/navigation';

interface Props {
  sign: string;
  english: string;
  hindi: string;
}

export default function ZodiacCard({ sign, english, hindi }: Props) {
  const router = useRouter();

  return (
    <div className="zodiac-card-uiverse" onClick={() => router.push(`/horoscope?sign=${sign}`)}>
      <div className="content-zodiac">
        <div className="word-zodiac">{english}</div>
        <div className="word-zodiac">{hindi}</div>
        <div className="word-zodiac">{english}</div>
      </div>
    </div>
  );
}
