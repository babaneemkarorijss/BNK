import type { Metadata } from 'next';
import Link from 'next/link';
import RealTimeClock from '@/components/RealTimeClock';
import ZodiacClient from '@/components/ZodiacClient';

export const metadata: Metadata = {
  title: 'Gemini Daily Horoscope',
  description: 'Your Gemini (मिथुन) Vedic horoscope for today – detailed guidance on education, love, career, health, finance, family, and remedies.',
};

export default function GeminiPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-serif text-sacred-red">Gemini Horoscope</h1>
        <p className="text-lg text-gray-600">मिथुन Rashi</p>
        <RealTimeClock />
      </section>

      <ZodiacClient sign="gemini" />

      <section className="text-center bg-sacred-red/5 rounded-2xl p-8 space-y-4">
        <h2 className="text-3xl font-serif text-sacred-red">Need Personal Guidance?</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          The stars have a message for you. Speak with our Vedic astrologers for a detailed, personalised reading.
        </p>
        <Link href="/contact" className="darshan-btn inline-block">Consult Now</Link>
      </section>
    </main>
  );
}
