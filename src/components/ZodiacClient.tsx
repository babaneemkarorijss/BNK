'use client';
import useSWR from 'swr';
import Link from 'next/link';

// ─── Complete 3‑day fallback data for all 12 signs ─────────
const FALLBACK_DATA: Record<number, Record<string, Array<{
  aspect: string; positive: string; negative: string; cta: string;
}>>> = {
  0: {
    aries: [
      { aspect: "Education", positive: "Your concentration is razor‑sharp today. Complex subjects feel approachable, and you may crack a problem that has been bothering you for weeks.", negative: "Restlessness could make it hard to sit still. Break study sessions into 25‑minute chunks with short breaks.", cta: "/contact" },
      { aspect: "Love", positive: "The air is thick with romance. An unexpected message from someone special could reignite old feelings.", negative: "Insecurity may whisper lies. Trust what your partner says, not what your fears imagine.", cta: "/contact" },
      { aspect: "Career", positive: "Your leadership skills are in the spotlight. A senior colleague may entrust you with a high‑visibility project.", negative: "Office politics could drain your energy. Stay focused and avoid gossip.", cta: "/contact" },
      { aspect: "Health", positive: "Vitality surges. It's an excellent day to start a new fitness routine or join a yoga class.", negative: "Digestive problems may arise if you eat out. Stick to light, home‑cooked meals.", cta: "/contact" },
      { aspect: "Finance", positive: "A stalled payment is likely to be released. Use it to clear pending bills or invest safely.", negative: "Avoid lending money to friends; it could strain relationships.", cta: "/contact" },
      { aspect: "Family", positive: "A family elder will share an inspiring story. Spend quality time with them.", negative: "A minor misunderstanding with your spouse could arise. Apologise quickly.", cta: "/contact" },
      { aspect: "Remedy", positive: "Chant the Hanuman Chalisa thrice today and offer a marigold garland to Lord Hanuman.", negative: "If challenges persist, a personalised consultation can reveal specific planetary remedies.", cta: "/contact" }
    ],
    taurus: [
      { aspect: "Education", positive: "Your perseverance will pay off. A difficult subject suddenly becomes clear.", negative: "Avoid overthinking; it may block creativity. Take short breaks.", cta: "/contact" },
      { aspect: "Love", positive: "Stability returns to your relationship. A quiet evening with your partner brings you closer.", negative: "Stubbornness could create unnecessary friction. Be willing to meet halfway.", cta: "/contact" },
      { aspect: "Career", positive: "Your practical approach solves a problem that has been bothering the team.", negative: "Don't let routine bore you. Seek out a new challenge to stay motivated.", cta: "/contact" },
      { aspect: "Health", positive: "Your stamina is good. Incorporate stretching or yoga to enhance flexibility.", negative: "Watch out for throat irritations. Drink warm water throughout the day.", cta: "/contact" },
      { aspect: "Finance", positive: "A safe investment made earlier may show moderate profits. Consider reinvesting.", negative: "Avoid lending money to friends; it could spoil the relationship.", cta: "/contact" },
      { aspect: "Family", positive: "Your spouse or parents may surprise you with a thoughtful gesture.", negative: "A teen in the house may test boundaries. Set limits with love, not anger.", cta: "/contact" },
      { aspect: "Remedy", positive: "Offer water to a Tulsi plant and light a ghee lamp in the evening. Wear green for harmony.", negative: "If troubles continue, a detailed birth‑chart reading can pinpoint the exact remedy.", cta: "/contact" }
    ],
    gemini: [
      { aspect: "Education", positive: "Your curiosity is your greatest asset. Research deeply into a topic that fascinates you.", negative: "Scattered focus could leave many tasks half‑finished. Prioritise one thing at a time.", cta: "/contact" },
      { aspect: "Love", positive: "Your wit and humour attract admirers. A casual conversation may lead to a meaningful connection.", negative: "Flirtation could be misinterpreted as insincerity. Be clear about your intentions.", cta: "/contact" },
      { aspect: "Career", positive: "Your ability to multitask helps you meet a tight deadline. Colleagues will appreciate your support.", negative: "Avoid taking on too many responsibilities – you may burn out. Learn to say no.", cta: "/contact" },
      { aspect: "Health", positive: "Mental agility is high. Puzzles, brain games, or learning a new language will be rewarding.", negative: "Nervous tension may cause restlessness. Try deep breathing exercises before sleep.", cta: "/contact" },
      { aspect: "Finance", positive: "A creative idea could generate extra income. Explore freelancing or selling handmade goods online.", negative: "Impulse buying is a risk today. Wait 24 hours before making a major purchase.", cta: "/contact" },
      { aspect: "Family", positive: "A lively discussion with siblings will bring laughter. Share your memories.", negative: "Your mood swings might confuse family members. Explain what you need calmly.", cta: "/contact" },
      { aspect: "Remedy", positive: "Recite the Gayatri Mantra 11 times at sunrise. Keep a piece of turquoise with you.", negative: "If problems persist, consult an astrologer for a personalised gemstone recommendation.", cta: "/contact" }
    ],
    cancer: [
      { aspect: "Education", positive: "Your intuition guides your studies. Trust your gut when choosing a research topic.", negative: "Emotional sensitivity may make criticism hurt more than it should. Remember feedback helps you grow.", cta: "/contact" },
      { aspect: "Love", positive: "Your nurturing side shines. Cooking a meal for your partner or family will fill the house with love.", negative: "Moodiness could push your loved ones away. Communicate instead of withdrawing.", cta: "/contact" },
      { aspect: "Career", positive: "Your empathy makes you a great team player. A colleague may confide in you, strengthening your bond.", negative: "Avoid taking work criticism personally. Separate professional feedback from your self‑worth.", cta: "/contact" },
      { aspect: "Health", positive: "Your emotional well‑being is strong. A long bath or a swim will be therapeutic.", negative: "Overeating due to stress is likely. Choose healthy snacks and drink plenty of water.", cta: "/contact" },
      { aspect: "Finance", positive: "A family member may offer financial support if needed. Don't hesitate to ask.", negative: "Emotional spending could drain your savings. Set a budget before you go shopping.", cta: "/contact" },
      { aspect: "Family", positive: "Your bond with your mother or a maternal figure deepens. Share a quiet cup of tea together.", negative: "A misunderstanding with your spouse could brew if you hold back your feelings. Speak gently.", cta: "/contact" },
      { aspect: "Remedy", positive: "Offer milk to Lord Shiva on Monday. Wear a pearl to calm your emotions.", negative: "For persistent emotional issues, a Vedic astrologer can prescribe specific mantras.", cta: "/contact" }
    ],
    leo: [
      { aspect: "Education", positive: "Your confidence helps you present ideas brilliantly. A speaking opportunity may arise – seize it.", negative: "Arrogance could alienate your peers. Listen as much as you speak.", cta: "/contact" },
      { aspect: "Love", positive: "Your generous heart wins admiration. Plan a surprise for your partner – it will be deeply appreciated.", negative: "Jealousy might rear its head if you feel ignored. Talk openly instead of sulking.", cta: "/contact" },
      { aspect: "Career", positive: "You are in the spotlight. A presentation or meeting will go exceptionally well.", negative: "Don't let success go to your head. Stay humble and acknowledge your team's effort.", cta: "/contact" },
      { aspect: "Health", positive: "Your vitality is at its peak. Channel it into a physical activity you enjoy, like dancing or running.", negative: "Heart‑related issues need attention. Avoid excessive excitement.", cta: "/contact" },
      { aspect: "Finance", positive: "A bonus or reward may come your way. Use it to treat yourself and your loved ones.", negative: "Extravagant spending on status symbols could deplete your savings. Prioritise needs over wants.", cta: "/contact" },
      { aspect: "Family", positive: "Your leadership at home is respected. You may need to mediate a dispute between siblings.", negative: "Your authoritative tone might offend elders. Soften your approach.", cta: "/contact" },
      { aspect: "Remedy", positive: "Offer water to the Sun at sunrise and chant 'Om Suryaya Namaha'. Wear gold for confidence.", negative: "If health or finances remain troublesome, seek a personalised astrological remedy.", cta: "/contact" }
    ],
    virgo: [
      { aspect: "Education", positive: "Your analytical skills are unmatched. You will find errors that others missed and earn respect.", negative: "Perfectionism could delay submission. Accept that 'good enough' is sometimes enough.", cta: "/contact" },
      { aspect: "Love", positive: "Small acts of service speak louder than words. Doing chores for your partner will touch their heart.", negative: "Over‑criticism can wound. Choose your words with care.", cta: "/contact" },
      { aspect: "Career", positive: "Your meticulous nature helps you complete a detailed report flawlessly. Your boss will be impressed.", negative: "Don't get bogged down in minutiae. Step back to see the bigger picture.", cta: "/contact" },
      { aspect: "Health", positive: "Your digestive system responds well to a balanced diet. Try a new healthy recipe.", negative: "Worry may cause insomnia. A warm glass of milk with turmeric before bed can help.", cta: "/contact" },
      { aspect: "Finance", positive: "Your budgeting skills are spot‑on. You may find a way to save extra money this month.", negative: "Avoid being penny‑wise and pound‑foolish. Invest in quality rather than chasing discounts.", cta: "/contact" },
      { aspect: "Family", positive: "Your practical help is valued. Assisting an elder with paperwork or technology will bring blessings.", negative: "Your critical nature may hurt a child's self‑esteem. Encourage more than you correct.", cta: "/contact" },
      { aspect: "Remedy", positive: "Feed green grass to cows on Wednesday. Wear an emerald to sharpen your intellect.", negative: "If stress persists, an astrologer can suggest mantras tailored to your birth chart.", cta: "/contact" }
    ],
    libra: [
      { aspect: "Education", positive: "Your sense of balance helps you weigh different viewpoints. Your essays or debates will be outstanding.", negative: "Indecision may cost you a deadline. Set a timer and make quick choices.", cta: "/contact" },
      { aspect: "Love", positive: "Romance is in the air. A date night or a heartfelt conversation will restore harmony.", negative: "Avoid people‑pleasing. Speak your truth even if it causes temporary discomfort.", cta: "/contact" },
      { aspect: "Career", positive: "Your diplomacy resolves a conflict at work. You may be asked to mediate between two departments.", negative: "Don't avoid necessary confrontation. Some issues must be addressed directly.", cta: "/contact" },
      { aspect: "Health", positive: "Your skin and hair glow today. Treat yourself to a spa session or a relaxing bath.", negative: "Lower back pain may trouble you. Stretch regularly and avoid prolonged sitting.", cta: "/contact" },
      { aspect: "Finance", positive: "A partnership may bring financial gain. Consider joint investments with a trusted friend.", negative: "Luxury spending is tempting. Stick to essential purchases until next week.", cta: "/contact" },
      { aspect: "Family", positive: "You bring peace to a family disagreement. Your unbiased advice will be appreciated.", negative: "Your desire to keep everyone happy may exhaust you. Take time for yourself.", cta: "/contact" },
      { aspect: "Remedy", positive: "Light a sandalwood incense in the evening. Wear a diamond or zircon for Venus's blessings.", negative: "For persistent relationship issues, consult an astrologer for a compatibility analysis.", cta: "/contact" }
    ],
    scorpio: [
      { aspect: "Education", positive: "Your intensity fuels deep research. You may uncover hidden information that gives you an edge.", negative: "Obsession with a single topic could narrow your perspective. Take breaks to refresh.", cta: "/contact" },
      { aspect: "Love", positive: "Passion runs high. Intimacy with your partner reaches new depths.", negative: "Jealousy and possessiveness could create rifts. Trust is the foundation of love.", cta: "/contact" },
      { aspect: "Career", positive: "Your determination helps you overcome a major obstacle. A competitor may be left behind.", negative: "Avoid power struggles with colleagues. They drain energy and create enemies.", cta: "/contact" },
      { aspect: "Health", positive: "Your regenerative powers are strong. A wound or illness heals faster than expected.", negative: "Mental stress could lead to headaches. Meditation is recommended.", cta: "/contact" },
      { aspect: "Finance", positive: "A hidden source of income may surface. Investigate investment opportunities carefully.", negative: "Secret spending could harm your budget. Be transparent with your partner about finances.", cta: "/contact" },
      { aspect: "Family", positive: "Your loyalty to family is unshakeable. A relative may confide a secret to you.", negative: "Suspicion could poison a close relationship. Verify facts before jumping to conclusions.", cta: "/contact" },
      { aspect: "Remedy", positive: "Offer red flowers to Lord Hanuman on Tuesday. Wear red coral for Mars's protection.", negative: "If emotional turmoil continues, a Vedic astrologer can guide you with specific rituals.", cta: "/contact" }
    ],
    sagittarius: [
      { aspect: "Education", positive: "Your philosophical bent leads to profound insights. A lecture or book changes your worldview.", negative: "Restlessness may prevent you from finishing a course. Commit to completing one module today.", cta: "/contact" },
      { aspect: "Love", positive: "Adventure beckons. Plan a trip or a new activity with your partner to rekindle the spark.", negative: "Bluntness could hurt feelings. Temper honesty with kindness.", cta: "/contact" },
      { aspect: "Career", positive: "An opportunity to travel for work or attend a conference arises. Say yes – it will expand your network.", negative: "Overpromising could land you in trouble. Be realistic about what you can deliver.", cta: "/contact" },
      { aspect: "Health", positive: "Your energy is boundless. Outdoor sports or hiking will be especially enjoyable.", negative: "Hip or thigh issues may flare up. Warm up properly before exercise.", cta: "/contact" },
      { aspect: "Finance", positive: "A lucky break may bring unexpected money. Consider donating a small portion to charity.", negative: "Gambling or speculative bets could backfire. Keep your risk low.", cta: "/contact" },
      { aspect: "Family", positive: "Your optimism lifts the household mood. Share your future plans with them; they'll support you.", negative: "You may come across as preachy. Listen to others' opinions as well.", cta: "/contact" },
      { aspect: "Remedy", positive: "Recite the Vishnu Sahasranama on Thursday. Wear yellow sapphire for Jupiter's blessings.", negative: "If luck seems elusive, a personalised horoscope reading can reveal the right time to act.", cta: "/contact" }
    ],
    capricorn: [
      { aspect: "Education", positive: "Discipline pays off. A structured study plan yields excellent results in exams or certifications.", negative: "Rigidity may limit creativity. Allow some flexibility in your approach.", cta: "/contact" },
      { aspect: "Love", positive: "Stability is your love language. A practical gesture, like fixing something at home, shows you care.", negative: "Workaholic tendencies could make your partner feel neglected. Schedule quality time.", cta: "/contact" },
      { aspect: "Career", positive: "Your hard work is finally recognised. A promotion or a raise may be on the horizon.", negative: "Don't let ambition trample relationships. Celebrate your success with your team.", cta: "/contact" },
      { aspect: "Health", positive: "Your bones and joints feel strong. Weight‑bearing exercises are beneficial.", negative: "Knee pain could act up. Avoid high‑impact activities today.", cta: "/contact" },
      { aspect: "Finance", positive: "A long‑term investment matures favourably. Reinvest the profits wisely.", negative: "Don't be overly frugal; spend on necessary comforts for your family.", cta: "/contact" },
      { aspect: "Family", positive: "Your role as the family anchor is appreciated. An elder may seek your advice on an important matter.", negative: "Your serious demeanour may intimidate children. Lighten up and play with them.", cta: "/contact" },
      { aspect: "Remedy", positive: "Offer black sesame seeds to Lord Shani on Saturday. Wear blue sapphire for Saturn's favour.", negative: "If professional hurdles continue, an astrologer can help you navigate them with specific remedies.", cta: "/contact" }
    ],
    aquarius: [
      { aspect: "Education", positive: "Your innovative mind finds a new way to solve an old problem. Share your idea with a study group.", negative: "Detachment may make you seem uninterested. Engage actively in discussions.", cta: "/contact" },
      { aspect: "Love", positive: "Friendship is the foundation of your romance. A deep conversation with your partner strengthens your bond.", negative: "Emotional aloofness could be misinterpreted as coldness. Show warmth through small gestures.", cta: "/contact" },
      { aspect: "Career", positive: "Your unique perspective is valued. A brainstorming session will benefit from your out‑of‑the‑box thinking.", negative: "Rebellion against authority may cause friction. Choose your battles wisely.", cta: "/contact" },
      { aspect: "Health", positive: "Your circulation is good. Try a new sport that gets your heart pumping.", negative: "Ankles or calves may be prone to sprains. Wear supportive footwear.", cta: "/contact" },
      { aspect: "Finance", positive: "A tech‑related investment could bring gains. Research before you commit.", negative: "Unconventional spending may raise eyebrows. Keep a record of all transactions.", cta: "/contact" },
      { aspect: "Family", positive: "Your progressive ideas inspire younger relatives. Mentor a niece or nephew today.", negative: "Your need for independence might clash with family traditions. Compromise is possible.", cta: "/contact" },
      { aspect: "Remedy", positive: "Donate black clothes to the needy on Saturday. Wear an amethyst for clarity.", negative: "If you feel stuck, a birth‑chart analysis can reveal the planetary influences at play.", cta: "/contact" }
    ],
    pisces: [
      { aspect: "Education", positive: "Your imagination is your greatest tool. Creative writing or art projects will flourish.", negative: "Daydreaming may cause you to miss important instructions. Stay grounded during lectures.", cta: "/contact" },
      { aspect: "Love", positive: "Romance feels like a fairytale. A dreamy date or a heartfelt poem will make your partner swoon.", negative: "Illusions could lead to disappointment. See your relationship clearly, not through rose‑coloured glasses.", cta: "/contact" },
      { aspect: "Career", positive: "Your compassion makes you a natural counsellor. A colleague may seek your advice on a personal matter.", negative: "Escapism through social media or daydreaming can hurt productivity. Set timers for focused work.", cta: "/contact" },
      { aspect: "Health", positive: "Your intuition about your body is strong. Listen to what it needs – perhaps more sleep or hydration.", negative: "Feet may feel tired or swollen. Soak them in warm salt water tonight.", cta: "/contact" },
      { aspect: "Finance", positive: "A creative venture could become a steady income stream. Explore your artistic talents.", negative: "Beware of scams or unrealistic promises. If it sounds too good to be true, it probably is.", cta: "/contact" },
      { aspect: "Family", positive: "Your empathetic nature heals old wounds. A heart‑to‑heart with a parent brings closure.", negative: "You may absorb others' emotions, leaving you drained. Set energetic boundaries.", cta: "/contact" },
      { aspect: "Remedy", positive: "Offer milk and honey to Lord Vishnu on Thursday. Wear a yellow sapphire for wisdom.", negative: "If emotional overwhelm persists, consult an astrologer for grounding remedies.", cta: "/contact" }
    ]
  }
};

// Days 1 and 2 reuse day 0 (can be customised later)
FALLBACK_DATA[1] = {};
FALLBACK_DATA[2] = {};
for (const sign of Object.keys(FALLBACK_DATA[0])) {
  FALLBACK_DATA[1][sign] = FALLBACK_DATA[0][sign];
  FALLBACK_DATA[2][sign] = FALLBACK_DATA[0][sign];
}

function getDayIndex(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)) % 3;
}

const colorMap: Record<string, string> = {
  'Saffron': '#F4A52D', 'Red': '#B32B2B', 'Yellow': '#FFD700', 'Gold': '#FFD700',
  'Silver': '#C0C0C0', 'Green': '#2E5A3B', 'Pink': '#FF69B4', 'Purple': '#800080',
  'Maroon': '#800000', 'White': '#FFFFFF', 'Blue': '#4D96FF', 'Black': '#1B0A2A',
};

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ZodiacClient({ sign }: { sign: string }) {
  const { data } = useSWR('/data/daily-horoscope.json', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 86400000,
  });

  const dayIndex = getDayIndex();
  const sections = FALLBACK_DATA[dayIndex]?.[sign] || FALLBACK_DATA[0][sign] || [];

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

      {/* AI Daily Message */}
      {aiMessage && (
        <div className="divine-card text-center">
          <p className="text-xl font-serif text-sacred-red italic">{aiMessage}</p>
          <p className="text-xs text-gray-400 mt-2">Moon in {moonSign}</p>
        </div>
      )}

      {/* Header */}
      <div className="divine-card text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-sacred-red mb-4">{sign.charAt(0).toUpperCase() + sign.slice(1)} Horoscope</h2>
        <p className="text-gray-500">Moon in {moonSign}</p>
      </div>

      {/* Section Cards */}
      {sections.length > 0 ? sections.map((section: any, idx: number) => (
        <div key={idx} className="divine-card p-6 flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-500">
          <div className="flex-1 space-y-4">
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
