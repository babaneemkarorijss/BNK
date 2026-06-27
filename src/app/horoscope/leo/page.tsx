import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { DailyHoroscope } from '@/components/DailyHoroscope';

export const metadata: Metadata = {
  title: 'Leo Daily Horoscope',
  description: 'Your Leo (Simha) Vedic horoscope for today. Consult our astrologers.',
};

export default function LeoPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-serif text-sacred-red">Leo Horoscope</h1>
        <p className="text-lg text-gray-600">सिंह राशि – Simha Rashi</p>
        <div className="flex justify-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-divine-saffron shadow-lg">
            <Image
              src="/assets/images/zodiac-leo.webp"
              alt="Leo"
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
        </div>
      </section>

      <DailyHoroscope sign="leo" />

      <section className="divine-card space-y-4">
        <h2 className="text-2xl font-serif text-sacred-red">Your Cosmic Constraints Today</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li><strong>Ruling Planet:</strong> Sun (Surya)</li>
          <li><strong>Element:</strong> Fire</li>
          <li><strong>Quality:</strong> Fixed (Sthira)</li>
          <li><strong>Lucky Colour:</strong> Gold / Orange</li>
          <li><strong>Lucky Number:</strong> 1</li>
        </ul>
      </section>

      <section className="text-center bg-sacred-red/5 rounded-2xl p-8 space-y-4">
        <h2 className="text-3xl font-serif text-sacred-red">Need Personal Guidance?</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          The stars have a message for you. Speak with our Vedic astrologers for a detailed, personalised reading.
        </p>
        <Link href="/contact" className="darshan-btn inline-block">
          Consult Now
        </Link>
      </section>
    </main>
  );
}
