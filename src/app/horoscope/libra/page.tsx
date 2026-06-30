import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ZodiacHoroscope from '@/components/ZodiacHoroscope';

export const metadata: Metadata = {
  title: 'Libra Daily Horoscope',
  description: 'Your Libra (तुला) Vedic horoscope for today. Consult our astrologers.',
};

export default function LibraPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-serif text-sacred-red">Libra Horoscope</h1>
        <p className="text-lg text-gray-600">तुला Rashi</p>
        <div className="flex justify-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-divine-saffron shadow-2xl hover:scale-110 transition-transform duration-500">
            <Image
              src="/assets/images/zodiac-libra.webp"
              alt="Libra"
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
        </div>
      </section>

      <ZodiacHoroscope sign="libra" />

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
