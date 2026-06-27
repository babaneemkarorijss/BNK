import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ZodiacWheel from '@/components/ZodiacWheel';
import LeelaCard from '@/components/LeelaCard';
import GlimpsesCard from '@/components/GlimpsesCard';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to the divine abode of Neem Karori Baba. Daily Vedic horoscope, leelas, and eternal love.',
};

export default function HomePage() {
  return (
    <main>
      {/* 1. Hero – layered devotional experience */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Full‑screen background */}
        <Image
          src="/assets/images/background.webp"
          alt="Ashram background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Rotating mandala – centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96 animate-spin-slow">
            <Image
              src="/assets/images/mandala.webp"
              alt="Rotating mandala"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 320px, 384px"
            />
          </div>
        </div>

        {/* Babaji – full portrait, softly rounded, gently pulsing */}
        <div className="relative z-10 w-64 md:w-80 lg:w-96 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl animate-pulse-babaji">
          <Image
            src="/assets/images/babaji.webp"
            alt="Neem Karori Baba"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
          />
        </div>

        {/* Overlay text – maroon colour */}
        <div className="absolute bottom-16 left-0 right-0 z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 text-sacred-red drop-shadow-lg">
            Ram Ram
          </h1>
          <p className="text-lg md:text-2xl font-light mb-6 text-sacred-red drop-shadow">
            Love, Serve, Remember – Always
          </p>
          <Link href="/horoscope" className="darshan-btn inline-block">
            Today&apos;s Horoscope
          </Link>
        </div>
      </section>

      {/* 2. Introduction */}
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-sacred-red mb-6">Who is Neem Karori Baba?</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          Maharaj-ji, lovingly called Babaji, was a saint of the Himalayan foothills. He taught the world that the highest form of worship is love.
        </p>
        <Link href="/about" className="text-divine-saffron font-semibold mt-4 inline-block">Learn more →</Link>
      </section>

      {/* 3. Daily Horoscope + Zodiac Wheel */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-sacred-red mb-8">Today&apos;s Vedic Horoscope</h2>
          <p className="text-gray-600 mb-10">Discover what the stars hold for you. Click your Moon sign for a personal message.</p>
          <ZodiacWheel />
        </div>
      </section>

      {/* 4. Core Teachings */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-sacred-red text-center mb-12">Babaji&apos;s Teachings</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Love Everyone', desc: 'Love is the strongest force in the universe.' },
            { title: 'Serve Everyone', desc: 'Selfless service is the path to God.' },
            { title: 'Remember God', desc: 'Keep the name of Ram in your heart always.' },
          ].map(t => (
            <div key={t.title} className="divine-card text-center">
              <h3 className="text-2xl font-serif mb-4">{t.title}</h3>
              <p className="text-gray-600">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Leelas Highlight – Uiverse Cards */}
      <section className="py-16 px-4 bg-sacred-red/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-sacred-red mb-6">Divine Leelas (Miracles)</h2>
          <p className="text-gray-600 mb-10">Stories that dissolve the mind and open the heart.</p>
          <div className="flex flex-wrap justify-center gap-8">
            <LeelaCard
              slug="birth"
              title="Birth & Childhood"
              description="The miraculous birth of Maharaj-ji and his early divine plays."
            />
            <LeelaCard
              slug="train"
              title="The Train Miracle"
              description="How Babaji stopped a train with a single gesture to help a devotee."
            />
            <LeelaCard
              slug="feeding"
              title="Feeding the 500"
              description="A small pot of kheer multiplied to feed a multitude – a leela of abundance."
            />
          </div>
          <Link href="/stories" className="text-divine-saffron font-semibold mt-8 inline-block">View all leelas →</Link>
        </div>
      </section>

      {/* 6. Live Darshan */}
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif text-sacred-red mb-4">Live Darshan from Kainchi Dham</h2>
        <p className="text-gray-600 mb-6">Join the daily aarti from the sacred ashram, wherever you are.</p>
        <Link href="/darshan" className="darshan-btn">Take Darshan</Link>
      </section>

      {/* 7. Bhajan of the Day */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-sacred-red mb-6">Bhajan of the Day</h2>
          <audio controls className="w-full mb-4">
            <source src="/assets/videos/hanuman-chalisa.mp4" type="audio/mp4" />
          </audio>
          <p className="text-gray-600">Shri Hanuman Chalisa – a favourite of Babaji.</p>
        </div>
      </section>

      {/* 8. Seva Opportunities */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif text-sacred-red text-center mb-8">Seva (Selfless Service)</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {['Annadanam (Food)', 'Cow Protection', 'Temple Maintenance'].map(s => (
            <div key={s} className="divine-card text-center">
              <h3 className="text-xl font-serif mb-4">{s}</h3>
              <p className="text-gray-600">Support the ashram&apos;s daily work.</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Quote */}
      <section className="py-16 px-4 bg-sacred-red/5 text-center">
        <blockquote className="text-2xl font-serif italic text-sacred-red max-w-2xl mx-auto">“The highest form of worship is love.”</blockquote>
        <p className="mt-4 text-gray-600">- Shri Neem Karori Baba</p>
      </section>

      {/* 10. Devotee Stories */}
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-serif text-sacred-red mb-6">Stories from Devotees</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {['Ram Dass', 'Krishna Das'].map(name => (
            <div key={name} className="divine-card">
              <p className="italic text-gray-600">“Babaji showed me the path of the heart.”</p>
              <p className="mt-2 font-semibold">- {name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. Glimpses of Divinity – Uiverse Cards */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif text-sacred-red text-center mb-8">Glimpses of Divinity</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <GlimpsesCard
            title="Ashram Services"
            description="Experience the divine offerings of Kainchi Dham"
            items={["Daily Aarti", "Prasad Distribution", "Langar Seva", "Bhajan Sandhya", "Satsang with Saints"]}
            buttonText="Explore Darshan"
            buttonLink="/darshan"
          />
          <GlimpsesCard
            title="Temple Timings"
            description="Plan your visit to receive Babaji's blessings"
            items={["Morning Aarti: 6:00 AM", "Evening Aarti: 6:00 PM", "Temple Open: 5 AM - 9 PM", "Special Pooja on Request", "Meditation Hall Access"]}
            buttonText="View Full Schedule"
            buttonLink="/darshan"
          />
          <GlimpsesCard
            title="Online Satsang"
            description="Connect with the ashram from anywhere in the world"
            items={["Live Streaming", "Daily Quotes", "Virtual Pooja", "E-Library", "Community Forum"]}
            buttonText="Join Satsang"
            buttonLink="/bhajans"
          />
        </div>
      </section>

      {/* 12. Newsletter */}
      <section className="py-16 px-4 bg-white/50 text-center">
        <h2 className="text-3xl font-serif text-sacred-red mb-4">Join Our Satsang</h2>
        <p className="text-gray-600 mb-6">Receive daily inspiration, horoscope updates, and Babaji&apos;s teachings.</p>
        <form className="max-w-md mx-auto flex gap-2">
          <input type="email" placeholder="Your email" className="flex-1 p-3 rounded-lg border" />
          <button type="submit" className="darshan-btn !py-3">Subscribe</button>
        </form>
      </section>

      {/* 13. FAQ Teaser */}
      <section className="py-16 px-4 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-serif text-sacred-red mb-6">Have Questions?</h2>
        <p className="text-gray-600 mb-6">Find answers to common questions about Babaji, the ashram, and our services.</p>
        <Link href="/faq" className="text-divine-saffron font-semibold">Visit FAQ →</Link>
      </section>

      {/* 14. Contact Invitation */}
      <section className="py-16 px-4 max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-serif text-sacred-red mb-6">Get in Touch</h2>
        <p className="text-gray-600 mb-6">Write to us for blessings, inquiries, or just to share your love for Babaji.</p>
        <Link href="/contact" className="darshan-btn">Contact Ashram</Link>
      </section>

      {/* 15. Final Golden Quote */}
      <section className="py-16 px-4 bg-gradient-to-r from-golden-dark via-divine-saffron to-golden-dark text-white text-center">
        <h2 className="text-3xl font-serif mb-4">Ram Ram</h2>
        <p className="text-xl">May Babaji&apos;s love fill your heart today.</p>
      </section>
    </main>
  );
}
