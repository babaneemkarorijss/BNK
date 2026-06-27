'use client';
import { useSearchParams } from 'next/navigation';
import ClientHoroscope from '@/app/horoscope/ClientHoroscope';
import ZodiacGrid from '@/app/horoscope/ZodiacGrid';

export default function HoroscopeWrapper() {
  const searchParams = useSearchParams();
  const sign = searchParams.get('sign');

  if (sign && ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'].includes(sign.toLowerCase())) {
    return <ClientHoroscope />;
  }
  return <ZodiacGrid />;
}
