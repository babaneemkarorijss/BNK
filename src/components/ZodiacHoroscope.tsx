'use client';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';

interface Section {
  aspect: string;
  positive: string;
  negative: string;
  image: string;
  cta: string;
}

interface HoroscopeData {
  moonSign: string;
  sections: Section[];
}

interface FullData {
  date: string;
  moon_sign: string;
  horoscopes: Record<string, HoroscopeData>;
  lucky_color: string;
  lucky_number: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

// Map color names to hex codes
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

export default function ZodiacHoroscope({ sign }: { sign: string }) {
  const { data, error, isLoading } = useSWR<FullData>('/data/daily-horoscope.json', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 86400000,
  });

  if (isLoading) {
    return (
      <div className="divine-card text-center animate-pulse py-12">
        <p className="text-xl font-serif text-divine-saffron">Chanting Ram Ram…</p>
      </div>
    );
  }

  if (error || !data || !data.horoscopes || !data.horoscopes[sign]) {
    return (
      <div className="divine-card text-center py-12">
        <p className="text-xl font-serif text-sacred-red">Today&apos;s guidance is being prepared.</p>
        <p className="text-sm text-gray-500 mt-2">Please check back soon.</p>
      </div>
    );
  }

  const horoscope = data.horoscopes[sign];
  const sections = horoscope.sections || [];
  const signName = sign.charAt(0).toUpperCase() + sign.slice(1);
  const luckyColorHex = colorMap[data.lucky_color] || data.lucky_color;

  return (
    <div className="space-y-12">
      {/* Lucky Colour & Number – 3D animated */}
      <div className="grid grid-cols-2 gap-6">
        {/* Lucky Colour */}
        <div className="divine-card text-center p-6 relative overflow-hidden group hover:scale-105 transition-transform duration-500">
          <div className="absolute inset-0 opacity-10 rounded-2xl" style={{ backgroundColor: luckyColorHex }}></div>
          <h3 className="text-lg font-serif text-gray-500 mb-2">Lucky Colour</h3>
          <div
            className="w-20 h-20 mx-auto rounded-full shadow-2xl animate-float border-4 border-white"
            style={{ backgroundColor: luckyColorHex }}
          ></div>
          <p className="mt-2 font-semibold text-gray-700">{data.lucky_color}</p>
        </div>

        {/* Lucky Number */}
        <div className="divine-card text-center p-6 group hover:scale-105 transition-transform duration-500">
          <h3 className="text-lg font-serif text-gray-500 mb-2">Lucky Number</h3>
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-divine-saffron to-sacred-red shadow-2xl flex items-center justify-center animate-float">
            <span className="text-4xl font-bold text-white">{data.lucky_number}</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">Your number for today</p>
        </div>
      </div>

      {/* Header card */}
      <div className="divine-card text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-sacred-red mb-4">{signName} Horoscope</h2>
        <p className="text-gray-500">Moon in {horoscope.moonSign || data.moon_sign}</p>
      </div>

      {/* Aspect cards */}
      {sections.map((section, idx) => (
        <div
          key={idx}
          className="divine-card overflow-hidden p-0 flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-500"
        >
          <div className="relative w-full md:w-1/3 h-48 md:h-auto overflow-hidden">
            <Image
              src={section.image}
              alt={section.aspect}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 300px"
            />
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
                  <Link
                    href={section.cta}
                    className="inline-block mt-2 text-sm bg-sacred-red text-white px-4 py-1 rounded-full hover:bg-red-700 transition"
                  >
                    Consult Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
