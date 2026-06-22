'use client';
import { useState } from 'react';
import useSWR from 'swr';
const signs = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
const fetcher = (url: string) => fetch(url).then(res => res.json());
export default function ClientHoroscope() {
  const [sign, setSign] = useState('aries');
  const { data, error } = useSWR('/data/daily-horoscope.json', fetcher, { revalidateOnFocus: false, dedupingInterval: 86400000 });
  return (
    <>
      <select value={sign} onChange={e => setSign(e.target.value)} className="w-full p-3 rounded-lg border border-divine-saffron/40 bg-white mb-8 text-lg">
        {signs.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
      </select>
      {error && <p className="text-red-500">Unable to fetch today&apos;s guidance. Ram Ram.</p>}
      {data && data.horoscopes ? (
        <div className="divine-card text-center">
          <p className="text-xl font-serif text-sacred-red mb-4">{data.horoscopes[sign] || 'Ram Ram, guidance loading...'}</p>
          <div className="flex justify-around mt-6 text-sm text-gray-500"><span>Lucky Colour: {data.lucky_color}</span><span>Lucky Number: {data.lucky_number}</span></div>
        </div>
      ) : (
        <div className="animate-pulse text-center text-divine-saffron">Chanting Ram Ram…</div>
      )}
    </>
  );
}
