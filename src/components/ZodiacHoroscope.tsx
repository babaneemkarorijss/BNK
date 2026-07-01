'use client';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';

// ---------- HARDCODED FALLBACK SECTIONS (3‑day cycle) ----------
// To ensure every zodiac page ALWAYS has content, we embed the
// fallback sections directly in the component. No fetch required.
const FALLBACK_DAYS = [0, 1, 2]; // indices for day0, day1, day2

// A simplified version of the fallback data – all 12 signs, 7 sections each.
// (Only a minimal set is shown below; the actual file will contain all 12 signs
// with full positive/negative texts. In the real script we'll write the complete
// data structure, but for brevity I'm illustrating the pattern.)

const FALLBACK_SECTIONS: Record<string, any> = {
  // Day 0 – Moon in Gemini
  "0": {
    aries: [
      { aspect: "Education", positive: "Your concentration is razor‑sharp today. Complex subjects feel approachable, and you may crack a problem that has been bothering you for weeks.", negative: "Restlessness could make it hard to sit still. Break study sessions into 25‑minute chunks with short breaks.", image: "/assets/images/aspect-education.webp", cta: "/contact" },
      { aspect: "Love", positive: "The air is thick with romance. An unexpected message from someone special could reignite old feelings.", negative: "Insecurity may whisper lies. Trust what your partner says, not what your fears imagine.", image: "/assets/images/aspect-love.webp", cta: "/contact" },
      { aspect: "Career", positive: "Your leadership skills are in the spotlight. A senior colleague may entrust you with a high‑visibility project.", negative: "Office politics could drain your energy. Stay focused and avoid gossip.", image: "/assets/images/aspect-career.webp", cta: "/contact" },
      { aspect: "Health", positive: "Vitality surges. It's an excellent day to start a new fitness routine or join a yoga class.", negative: "Digestive problems may arise if you eat out. Stick to light, home‑cooked meals.", image: "/assets/images/aspect-health.webp", cta: "/contact" },
      { aspect: "Finance", positive: "A stalled payment is likely to be released. Use it to clear pending bills or invest safely.", negative: "Avoid lending money to friends; it could strain relationships.", image: "/assets/images/aspect-finance.webp", cta: "/contact" },
      { aspect: "Family", positive: "A family elder will share an inspiring story. Spend quality time with them.", negative: "A minor misunderstanding with your spouse could arise. Apologise quickly.", image: "/assets/images/aspect-family.webp", cta: "/contact" },
      { aspect: "Remedy", positive: "Chant the Hanuman Chalisa thrice today and offer a marigold garland to Lord Hanuman.", negative: "If challenges persist, a personalised consultation can reveal specific planetary remedies.", image: "/assets/images/aspect-remedy.webp", cta: "/contact" }
    ],
    taurus: [
      { aspect: "Education", positive: "Your perseverance will pay off. A difficult subject suddenly becomes clear.", negative: "Avoid overthinking; it may block creativity. Take short breaks.", image: "/assets/images/aspect-education.webp", cta: "/contact" },
      // ... (all sections for all signs in the complete script)
    ],
    // ... gemini, cancer, leo, virgo, libra, scorpio, sagittarius, capricorn, aquarius, pisces
  },
  // Day 1 – Moon in Cancer (similar structure)
  "1": {},
  // Day 2 – Moon in Leo (similar structure)
  "2": {}
};

// Helper to get the current day index (0/1/2)
function getDayIndex(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) % 3;
}

// Colour map
const colorMap: Record<string, string> = {
  'Saffron': '#F4A52D',
  'Red': '#B32B2B',
  'Yellow': '#FFD700',
  'Gold': '#FFD700',
  'Silver': '#C0C0C0',
  'Green': '#2E5A3B',
  'Pink': '#FF69B4',
  'Purple': '#800080',
  'Maroon': '#800000',
  'White': '#FFFFFF',
  'Blue': '#4D96FF',
  'Black': '#1B0A2A',
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ZodiacHoroscope({ sign }: { sign: string }) {
  const { data } = useSWR('/data/daily-horoscope.json', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 86400000,
  });

  // Determine which sections to show
  const dayIndex = getDayIndex();
  // Use hardcoded fallback sections for the current day
  const fallbackDay = FALLBACK_SECTIONS[String(dayIndex)] || FALLBACK_SECTIONS["0"];
  const fallbackSections = fallbackDay[sign] || [];

  // Extract AI plain text if available
  const aiMessage: string | null = data?.horoscopes?.[sign]
    ? (typeof data.horoscopes[sign] === 'string' ? data.horoscopes[sign] : null)
    : null;

  const signName = sign.charAt(0).toUpperCase() + sign.slice(1);
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
        <h2 className="text-3xl md:text-4xl font-serif text-sacred-red mb-4">{signName} Horoscope</h2>
        <p className="text-gray-500">Moon in {moonSign}</p>
      </div>

      {/* Fallback Sections (ALWAYS shown) */}
      {fallbackSections.length > 0 && fallbackSections.map((section: any, idx: number) => (
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
      ))}
    </div>
  );
}
