import type { Metadata } from 'next';
import ClientHoroscope from './ClientHoroscope';
export const metadata: Metadata = {
  title: 'Daily Horoscope',
  description: 'Your daily Vedic horoscope based on Moon sign.',
};
export default function HoroscopePage() {
  return <div className="max-w-2xl mx-auto py-16 px-4"><h1 className="text-4xl font-serif text-sacred-red mb-8 text-center">Daily Horoscope</h1><ClientHoroscope /></div>;
}
