import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Slideshow from '@/components/Slideshow';
import ZodiacWheel from '@/components/ZodiacWheel';

export const metadata: Metadata = {
  title: 'Home',
  description: 'B.N.K. Jyotish Seva – Divine Vedic Astrology inspired by Neem Karori Baba. Daily horoscope, leelas, and spiritual guidance.',
};

export default function HomePage() {
  return (
    <main>
      {/* 1. Hero – Full screen with Babaji portrait and mandala */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image src="/assets/images/background.webp" alt="Ashram" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/70 via-transparent to-purple-950/70" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-80 h-80 md:w-96 md:h-96 animate-spin-slow">
            <Image src="/assets/images/mandala.webp" alt="Mandala" fill className="object-contain" sizes="384px" />
          </div>
        </div>
        <div className="relative z-10 w-56 md:w-72 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl animate-pulse-babaji">
          <Image src="/assets/images/babaji.webp" alt="Babaji" fill className="object-contain" sizes="288px" />
        </div>
        <div className="absolute bottom-20 left-0 right-0 z-20 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 text-white drop-shadow-2xl">Ram Ram</h1>
          <p className="text-xl md:text-2xl font-light mb-8 text-purple-200 drop-shadow-lg">Love, Serve, Remember</p>
          <Link href="/horoscope" className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-transform text-lg">
            Today&apos;s Horoscope
          </Link>
        </div>
      </section>

      {/* 2. Slideshow – Glimpses of Divinity */}
      <section className="py-20 px-4 bg-purple-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-purple-900 mb-4">Glimpses of Divinity</h2>
          <p className="text-gray-600 mb-10">Sacred moments captured at Kainchi Dham and beyond</p>
          <Slideshow />
        </div>
      </section>

      {/* 3. Daily Horoscope + Zodiac Wheel */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-purple-900 mb-4">Daily Vedic Horoscope</h2>
          <p className="text-gray-600 mb-10">Discover what the stars hold for your Moon sign today</p>
          <ZodiacWheel />
          <Link href="/horoscope" className="inline-block mt-8 text-purple-700 font-semibold hover:text-amber-600 transition">
            View All Signs →
          </Link>
        </div>
      </section>

      {/* 4. Core Teachings */}
      <section className="py-20 px-4 bg-purple-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-purple-900 mb-12">Babaji&apos;s Teachings</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Love Everyone', desc: 'Love is the strongest force in the universe. Love all beings unconditionally.' },
              { title: 'Serve Everyone', desc: 'Selfless service is the path to God. Feed the hungry, help the needy.' },
              { title: 'Remember God', desc: 'Keep the name of Ram in your heart always. Chant Ram Ram and be free.' },
            ].map(t => (
              <div key={t.title} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                <h3 className="text-2xl font-serif text-purple-800 mb-4">{t.title}</h3>
                <p className="text-gray-600">{t.desc}</p>
              </div>
            ))}
          </div>
          <Link href="/teachings" className="inline-block mt-8 text-purple-700 font-semibold hover:text-amber-600 transition">
            Explore All Teachings →
          </Link>
        </div>
      </section>

      {/* 5. Divine Leelas */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-purple-900 mb-4">Divine Leelas</h2>
          <p className="text-gray-600 mb-10">Miraculous stories that open the heart</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { slug: 'removal-of-doubt', title: 'Removal of Doubt', img: 'leela-removal-of-doubt.webp' },
              { slug: 'dumb-child-speaks', title: 'The Dumb Child Speaks', img: 'leela-dumb-child.webp' },
              { slug: 'bullets-absorbed', title: 'Bullets Absorbed', img: 'leela-bullets.webp' },
            ].map(story => (
              <Link key={story.slug} href={`/stories/${story.slug}`} className="group block bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500">
                <div className="relative h-48 overflow-hidden">
                  <Image src={`/assets/images/${story.img}`} alt={story.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="300px" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-purple-800">{story.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/stories" className="inline-block mt-8 text-purple-700 font-semibold hover:text-amber-600 transition">
            View All Leelas →
          </Link>
        </div>
      </section>

      {/* 6. Quote */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-purple-800 text-white text-center">
        <blockquote className="text-3xl md:text-4xl font-serif italic max-w-3xl mx-auto">
          &ldquo;The highest form of worship is love.&rdquo;
        </blockquote>
        <p className="mt-4 text-purple-300 text-lg">— Shri Neem Karori Baba</p>
      </section>

      {/* 7. Seva & Donations */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-purple-900 mb-4">Seva &amp; Donations</h2>
          <p className="text-gray-600 mb-10">Support the ashram&apos;s daily work. Every offering is a step toward grace.</p>
          <Link href="/seva" className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-transform text-lg">
            Offer Seva
          </Link>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="py-20 px-4 bg-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-purple-900 mb-12">Devotee Experiences</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Ram Dass', quote: 'Babaji showed me the path of the heart.' },
              { name: 'Krishna Das', quote: 'His love dissolved every boundary I had built.' },
            ].map(d => (
              <div key={d.name} className="bg-white rounded-2xl shadow-xl p-8">
                <p className="italic text-gray-600 mb-4">&ldquo;{d.quote}&rdquo;</p>
                <p className="font-semibold text-purple-800">— {d.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Contact CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-950 to-purple-900 text-white text-center">
        <h2 className="text-4xl md:text-5xl font-serif mb-4">Get in Touch</h2>
        <p className="text-purple-200 mb-8 max-w-xl mx-auto">For personalised astrological guidance, reach out to us.</p>
        <Link href="/contact" className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold px-10 py-4 rounded-full shadow-xl hover:scale-105 transition-transform text-lg">
          Contact Us
        </Link>
      </section>
    </main>
  );
}
