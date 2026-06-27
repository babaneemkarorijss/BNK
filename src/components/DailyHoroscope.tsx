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
  sections: Section[];
  moonSign: string;
}

interface FullData {
  date: string;
  moon_sign: string;
  horoscopes: Record<string, HoroscopeData>;
  lucky_color: string;
  lucky_number: number;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function DailyHoroscope({ sign }: { sign: string }) {
  const { data, error, isLoading } = useSWR<FullData>('/data/daily-horoscope.json', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 86400000,
  });

  if (isLoading) {
    return (
      <div className="divine-card text-center animate-pulse">
        <p className="text-xl font-serif text-divine-saffron">Chanting Ram Ram…</p>
      </div>
    );
  }

  if (error || !data || !data.horoscopes || !data.horoscopes[sign]) {
    return (
      <div className="divine-card text-center">
        <p className="text-xl font-serif text-sacred-red">Today&apos;s guidance is being prepared.</p>
        <p className="text-sm text-gray-500 mt-2">Please check back soon.</p>
      </div>
    );
  }

  const horoscope = data.horoscopes[sign];
  const sections = horoscope.sections || [];
  const signName = sign.charAt(0).toUpperCase() + sign.slice(1);

  return (
    <div className="space-y-10">
      {/* Header card */}
      <div className="divine-card text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-sacred-red mb-4">{signName} Horoscope</h2>
        <p className="text-gray-500">Moon in {horoscope.moonSign || data.moon_sign}</p>
        <div className="flex justify-around mt-4 text-sm text-gray-600">
          <span>Lucky Colour: {data.lucky_color}</span>
          <span>Lucky Number: {data.lucky_number}</span>
        </div>
      </div>

      {/* Aspect cards */}
      {sections.map((section, idx) => (
        <div key={idx} className="divine-card overflow-hidden p-0 flex flex-col md:flex-row">
          <div className="relative w-full md:w-1/3 h-48 md:h-auto">
            <Image
              src={section.image}
              alt={section.aspect}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
          <div className="p-6 flex-1 space-y-4">
            <h3 className="text-2xl font-serif text-sacred-red">{section.aspect}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-600 mt-1">✔</span>
                <p className="text-gray-700">{section.positive}</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-500 mt-1">⚠</span>
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
