import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to the divine abode of Neem Karori Baba. Daily horoscope, leelas, and eternal love.',
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Shri Neem Karori Baba Sansthan',
          url: 'https://neemkaroribaba.org',
          potentialAction: {
            '@type': 'SearchAction',
            target: { '@type': 'EntryPoint', urlTemplate: 'https://neemkaroribaba.org/search?q={search_term_string}' },
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      <main className="flex-1">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="/assets/images/babaji-hero.webp"
            alt="Neem Karori Baba"
            fill
            priority
            className="object-cover opacity-90"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight-devotion/40 to-transparent" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 drop-shadow-lg">
              Ram Ram
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8">
              Love, Serve, Remember – Always
            </p>
            <Link href="/horoscope" className="darshan-btn inline-block">
              Today&apos;s Horoscope
            </Link>
          </div>
        </section>
        <section className="py-16 px-4 max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl font-serif italic text-sacred-red">
            &ldquo;The highest form of worship is love.&rdquo;
          </blockquote>
          <p className="mt-4 text-gray-600">- Shri Neem Karori Baba</p>
        </section>
      </main>
    </>
  );
}
