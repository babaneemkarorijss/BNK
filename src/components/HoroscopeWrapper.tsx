'use client';
import { useSearchParams } from 'next/navigation';
import ZodiacGrid from '@/app/horoscope/ZodiacGrid';

export default function HoroscopeWrapper() {
  const searchParams = useSearchParams();
  const sign = searchParams.get('sign');
  // If a sign is selected, we redirect to that sign's individual page
  // which now has the full hardcoded sections.
  // The HoroscopeWrapper now only shows the ZodiacGrid on the main horoscope page.
  return <ZodiacGrid />;
}
