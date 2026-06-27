import type { Metadata } from 'next';
import { Suspense } from 'react';
import RealTimeClock from '@/components/RealTimeClock';
import HoroscopeWrapper from '@/components/HoroscopeWrapper';

export const metadata: Metadata = {
  title: 'Daily Horoscope',
  description: 'Your daily Vedic horoscope based on Moon sign – live cosmic guidance.',
};

export default function HoroscopePage() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-sacred-red">Daily Horoscope</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          The cosmos is alive. Discover the guidance written in the stars for your Moon sign.
        </p>
        <RealTimeClock />
      </section>
      <Suspense fallback={<div className="text-center text-divine-saffron">Loading zodiac...</div>}>
        <HoroscopeWrapper />
      </Suspense>
    </div>
  );
}
