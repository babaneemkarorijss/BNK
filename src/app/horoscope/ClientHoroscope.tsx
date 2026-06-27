'use client';
import { useSearchParams } from 'next/navigation';
import { DailyHoroscope } from '@/components/DailyHoroscope';

export default function ClientHoroscope() {
  const searchParams = useSearchParams();
  const sign = searchParams.get('sign') || 'aries';
  return <DailyHoroscope sign={sign} />;
}
