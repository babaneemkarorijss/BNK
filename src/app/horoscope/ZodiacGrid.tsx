import ZodiacCard from '@/components/ZodiacCard';

const zodiacData = [
  { sign: 'aries', english: 'Aries', hindi: 'मेष' },
  { sign: 'taurus', english: 'Taurus', hindi: 'वृषभ' },
  { sign: 'gemini', english: 'Gemini', hindi: 'मिथुन' },
  { sign: 'cancer', english: 'Cancer', hindi: 'कर्क' },
  { sign: 'leo', english: 'Leo', hindi: 'सिंह' },
  { sign: 'virgo', english: 'Virgo', hindi: 'कन्या' },
  { sign: 'libra', english: 'Libra', hindi: 'तुला' },
  { sign: 'scorpio', english: 'Scorpio', hindi: 'वृश्चिक' },
  { sign: 'sagittarius', english: 'Sagittarius', hindi: 'धनु' },
  { sign: 'capricorn', english: 'Capricorn', hindi: 'मकर' },
  { sign: 'aquarius', english: 'Aquarius', hindi: 'कुम्भ' },
  { sign: 'pisces', english: 'Pisces', hindi: 'मीन' },
];

export default function ZodiacGrid() {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {zodiacData.map((zodiac) => (
        <ZodiacCard key={zodiac.sign} {...zodiac} />
      ))}
    </div>
  );
}
