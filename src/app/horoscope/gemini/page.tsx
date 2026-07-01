import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gemini Daily Horoscope',
  description: 'Your Gemini (मिथुन) Vedic horoscope for today – detailed guidance on education, love, career, health, finance, family, and remedies.',
};

// ─── COMPLETE 3‑DAY FALLBACK DATA FOR Gemini ──────────────────
// These sections are always shown, regardless of AI generation.
// The AI‑generated text (if available) appears as a daily message above the cards.

const FALLBACK_SECTIONS: Record<number, Array<{
  aspect: string;
  positive: string;
  negative: string;
  image: string;
  cta: string;
}>> = {
  0: [
    {
      aspect: "Education",
      positive: "Your concentration is razor‑sharp today. Complex subjects feel approachable, and you may crack a problem that has been bothering you for weeks.",
      negative: "Restlessness could make it hard to sit still. Break study sessions into 25‑minute chunks with short breaks.",
      image: "/assets/images/aspect-education.webp",
      cta: "/contact"
    },
    {
      aspect: "Love",
      positive: "The air is thick with romance. An unexpected message from someone special could reignite old feelings.",
      negative: "Insecurity may whisper lies. Trust what your partner says, not what your fears imagine.",
      image: "/assets/images/aspect-love.webp",
      cta: "/contact"
    },
    {
      aspect: "Career",
      positive: "Your leadership skills are in the spotlight. A senior colleague may entrust you with a high‑visibility project.",
      negative: "Office politics could drain your energy. Stay focused and avoid gossip.",
      image: "/assets/images/aspect-career.webp",
      cta: "/contact"
    },
    {
      aspect: "Health",
      positive: "Vitality surges. It's an excellent day to start a new fitness routine or join a yoga class.",
      negative: "Digestive problems may arise if you eat out. Stick to light, home‑cooked meals.",
      image: "/assets/images/aspect-health.webp",
      cta: "/contact"
    },
    {
      aspect: "Finance",
      positive: "A stalled payment is likely to be released. Use it to clear pending bills or invest safely.",
      negative: "Avoid lending money to friends; it could strain relationships.",
      image: "/assets/images/aspect-finance.webp",
      cta: "/contact"
    },
    {
      aspect: "Family",
      positive: "A family elder will share an inspiring story. Spend quality time with them.",
      negative: "A minor misunderstanding with your spouse could arise. Apologise quickly.",
      image: "/assets/images/aspect-family.webp",
      cta: "/contact"
    },
    {
      aspect: "Remedy",
      positive: "Chant the Hanuman Chalisa thrice today and offer a marigold garland to Lord Hanuman.",
      negative: "If challenges persist, a personalised consultation can reveal specific planetary remedies.",
      image: "/assets/images/aspect-remedy.webp",
      cta: "/contact"
    }
  ],
  1: [
    {
      aspect: "Education",
      positive: "Today the stars align for deep learning. A subject you previously struggled with suddenly makes sense.",
      negative: "Impatience could cause you to skip foundational steps. Slow down and ensure understanding.",
      image: "/assets/images/aspect-education.webp",
      cta: "/contact"
    },
    {
      aspect: "Love",
      positive: "Passion ignites unexpectedly. A glance across a room may spark romance.",
      negative: "Jealousy could rear its head. Focus on what you have, not what you lack.",
      image: "/assets/images/aspect-love.webp",
      cta: "/contact"
    },
    {
      aspect: "Career",
      positive: "Your initiative at work will be rewarded. A project may gain traction.",
      negative: "Office politics could distract you. Stay focused on your goals.",
      image: "/assets/images/aspect-career.webp",
      cta: "/contact"
    },
    {
      aspect: "Health",
      positive: "Vitality surges. Begin a new fitness regime or outdoor activity.",
      negative: "Headaches from stress. Take short breaks and practice deep breathing.",
      image: "/assets/images/aspect-health.webp",
      cta: "/contact"
    },
    {
      aspect: "Finance",
      positive: "A financial opportunity may come through a friend or relative.",
      negative: "Avoid lending large sums without documentation.",
      image: "/assets/images/aspect-finance.webp",
      cta: "/contact"
    },
    {
      aspect: "Family",
      positive: "Harmony at home prevails. A family dinner strengthens bonds.",
      negative: "A minor disagreement with a sibling may arise. Let it go.",
      image: "/assets/images/aspect-family.webp",
      cta: "/contact"
    },
    {
      aspect: "Remedy",
      positive: "Chant the Hanuman Chalisa with full devotion. Offer sindoor to Lord Hanuman.",
      negative: "If obstacles persist, a birth‑chart analysis can reveal specific remedies.",
      image: "/assets/images/aspect-remedy.webp",
      cta: "/contact"
    }
  ],
  2: [
    {
      aspect: "Education",
      positive: "Your confidence in the classroom is magnetic. Excel in presentations and group leadership.",
      negative: "Arrogance may prevent you from listening to others' valuable input. Stay open.",
      image: "/assets/images/aspect-education.webp",
      cta: "/contact"
    },
    {
      aspect: "Love",
      positive: "Your passion and warmth ignite romance. A spontaneous adventure creates memories.",
      negative: "A hot temper could spark an argument. Pause and breathe before responding.",
      image: "/assets/images/aspect-love.webp",
      cta: "/contact"
    },
    {
      aspect: "Career",
      positive: "Take initiative on a new project. Boldness will be rewarded.",
      negative: "Avoid clashing with authority. Diplomacy serves better.",
      image: "/assets/images/aspect-career.webp",
      cta: "/contact"
    },
    {
      aspect: "Health",
      positive: "Energy and vitality are at their peak. High‑intensity workout satisfying.",
      negative: "Headaches from overexertion. Stay hydrated and take rest periods.",
      image: "/assets/images/aspect-health.webp",
      cta: "/contact"
    },
    {
      aspect: "Finance",
      positive: "A bold investment could yield quick returns. Luck is on your side.",
      negative: "Don't gamble what you can't afford to lose. Keep a safety net.",
      image: "/assets/images/aspect-finance.webp",
      cta: "/contact"
    },
    {
      aspect: "Family",
      positive: "Leadership at home is appreciated. Organise a family activity.",
      negative: "A power struggle with an elder could create tension. Show respect.",
      image: "/assets/images/aspect-family.webp",
      cta: "/contact"
    },
    {
      aspect: "Remedy",
      positive: "Offer water to the Sun at sunrise. Wear a ruby for confidence.",
      negative: "If blocked, an astrologer can suggest a Sun‑strengthening ritual.",
      image: "/assets/images/aspect-remedy.webp",
      cta: "/contact"
    }
  ]
};

// Helper: get current day index (0‑2)
function getDayIndex(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) % 3;
}

// Colour map for lucky colour
const colorMap: Record<string, string> = {
  'Saffron': '#F4A52D', 'Red': '#B32B2B', 'Yellow': '#FFD700', 'Gold': '#FFD700',
  'Silver': '#C0C0C0', 'Green': '#2E5A3B', 'Pink': '#FF69B4', 'Purple': '#800080',
  'Maroon': '#800000', 'White': '#FFFFFF', 'Blue': '#4D96FF', 'Black': '#1B0A2A',
};

// SWR fetcher
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function GeminiPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-serif text-sacred-red">Gemini Horoscope</h1>
        <p className="text-lg text-gray-600">मिथुन Rashi</p>
        <div className="flex justify-center">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-divine-saffron shadow-2xl hover:scale-110 transition-transform duration-500">
            <Image
              src="/assets/images/zodiac-gemini.webp"
              alt="Gemini"
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
        </div>
      </section>

      <HoroscopeContent sign="gemini" />

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

// Client component that fetches daily data and shows sections
'use client';
import { useSWR } from 'swr';

function HoroscopeContent({ sign }: { sign: string }) {
  const { data } = useSWR('/data/daily-horoscope.json', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 86400000,
  });

  const dayIndex = getDayIndex();
  const sections = FALLBACK_SECTIONS[dayIndex] || FALLBACK_SECTIONS[0];

  const aiMessage = data?.horoscopes?.[sign] && typeof data.horoscopes[sign] === 'string'
    ? data.horoscopes[sign] : null;

  const luckyColorHex = data ? colorMap[data.lucky_color] || data.lucky_color : '#F4A52D';
  const luckyNumber = data ? data.lucky_number : 0;
  const moonSign = data?.moon_sign || '';

  return (
    <div className="space-y-12">
      {/* Lucky Colour & Number */}
      <div className="grid grid-cols-2 gap-6">
        <div className="divine-card text-center p-6 relative overflow-hidden group hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 opacity-10 rounded-2xl" style={{ backgroundColor: luckyColorHex }}></div>
          <h3 className="text-lg font-serif text-gray-500 mb-2">Lucky Colour</h3>
          <div className="w-20 h-20 mx-auto rounded-full shadow-2xl animate-float border-4 border-white" style={{ backgroundColor: luckyColorHex }}></div>
          <p className="mt-2 font-semibold text-gray-700">{data?.lucky_color || 'Unknown'}</p>
        </div>
        <div className="divine-card text-center p-6 group hover:scale-105 transition-transform duration-500">
          <h3 className="text-lg font-serif text-gray-500 mb-2">Lucky Number</h3>
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-divine-saffron to-sacred-red shadow-2xl flex items-center justify-center animate-float">
            <span className="text-4xl font-bold text-white">{luckyNumber}</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">Your number for today</p>
        </div>
      </div>

      {/* AI Daily Message (if available) */}
      {aiMessage && (
        <div className="divine-card text-center">
          <p className="text-xl font-serif text-sacred-red italic">{aiMessage}</p>
          <p className="text-xs text-gray-400 mt-2">Moon in {moonSign}</p>
        </div>
      )}

      {/* Header */}
      <div className="divine-card text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-sacred-red mb-4">Gemini Horoscope</h2>
        <p className="text-gray-500">Moon in {moonSign}</p>
      </div>

      {/* Section Cards (always visible) */}
      {sections.length > 0 ? sections.map((section: any, idx: number) => (
        <div key={idx} className="divine-card overflow-hidden p-0 flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-500">
          <div className="relative w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
            <Image src={section.image} alt={section.aspect} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 300px" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden"></div>
          </div>
          <div className="p-6 flex-1 space-y-4">
            <h3 className="text-2xl font-serif text-sacred-red">{section.aspect}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-1 text-lg">✦</span>
                <p className="text-gray-700">{section.positive}</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 mt-1 text-lg">⚠</span>
                <div>
                  <p className="text-gray-700">{section.negative}</p>
                  <Link href={section.cta} className="inline-block mt-2 text-sm bg-sacred-red text-white px-4 py-1 rounded-full hover:bg-red-700 transition">Consult Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )) : (
        <div className="divine-card text-center py-8">
          <p className="text-lg text-gray-500">Loading your guidance… Ram Ram!</p>
        </div>
      )}
    </div>
  );
}
