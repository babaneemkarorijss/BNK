'use client';
import Link from 'next/link';
import Image from 'next/image';

const zodiacs = [
  { sign: 'aries', img: 'zodiac-aries.webp' },
  { sign: 'taurus', img: 'zodiac-taurus.webp' },
  { sign: 'gemini', img: 'zodiac-gemini.webp' },
  { sign: 'cancer', img: 'zodiac-cancer.webp' },
  { sign: 'leo', img: 'zodiac-leo.webp' },
  { sign: 'virgo', img: 'zodiac-virgo.webp' },
  { sign: 'libra', img: 'zodiac-libra.webp' },
  { sign: 'scorpio', img: 'zodiac-scorpio.webp' },
  { sign: 'sagittarius', img: 'zodiac-sagittarius.webp' },
  { sign: 'capricorn', img: 'zodiac-capricorn.webp' },
  { sign: 'aquarius', img: 'zodiac-aquarius.webp' },
  { sign: 'pisces', img: 'zodiac-pisces.webp' },
];

export default function ZodiacWheel() {
  return (
    <div className="zodiac-container flex flex-wrap justify-center gap-6 py-8">
      {zodiacs.map(z => (
        <Link key={z.sign} href={`/horoscope?sign=${z.sign}`} className="zodiac-card w-24 h-24 md:w-32 md:h-32 rounded-full bg-white shadow-lg overflow-hidden border-2 border-divine-saffron/30">
          <Image
            src={`/assets/images/${z.img}`}
            alt={z.sign}
            width={128}
            height={128}
            className="zodiac-img w-full h-full object-cover"
          />
        </Link>
      ))}
    </div>
  );
}
