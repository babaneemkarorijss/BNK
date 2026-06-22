import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
export const metadata: Metadata = { title: 'Home', description: 'Welcome to the divine abode of Neem Karori Baba' };
export default function HomePage() {
  return (
    <main>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image src="/assets/images/babaji-hero.webp" alt="Babaji" fill priority className="object-cover opacity-90" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-devotion/40 to-transparent" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 drop-shadow-lg">Ram Ram</h1>
          <p className="text-xl md:text-2xl font-light mb-8">Love, Serve, Remember – Always</p>
          <Link href="/horoscope" className="darshan-btn inline-block">Today's Horoscope</Link>
        </div>
      </section>
    </main>
  );
}
