import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { julian, moonposition } = require('astronomia');

const signs = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];

function getMoonSign(date) {
  const jd = julian.CalendarGregorianToJD(date.getFullYear(), date.getMonth()+1, date.getDate(), 5, 30, 0);
  const moon = moonposition.position(jd);
  const ayanamsa = (23.85 + 0.013 * ((jd - 2451545.0) / 36525)) * Math.PI / 180;
  const sidereal = moon.lon - ayanamsa;
  return signs[Math.floor((sidereal * 180 / Math.PI) / 30) % 12];
}

const today = new Date();
const istNow = new Date(today.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
const dayOfYear = Math.floor((istNow - new Date(istNow.getFullYear(), 0, 0)) / 86400000);
const dayIndex = dayOfYear % 6;
const moonSign = getMoonSign(istNow);

// ---------- Pre‑written fallback ----------
const prewrittenPath = path.join(process.cwd(), 'public', 'data', 'fallback', `day${dayIndex}.json`);
if (fs.existsSync(prewrittenPath)) {
  console.log(`📅 Using pre‑written fallback for day index ${dayIndex}`);
  const content = fs.readFileSync(prewrittenPath, 'utf8');
  const data = JSON.parse(content);
  // Override date and moon_sign
  data.date = istNow.toISOString().slice(0, 10);
  data.moon_sign = moonSign;
  for (const sign of signs) {
    if (data.horoscopes[sign]) {
      data.horoscopes[sign].moonSign = moonSign;
    }
  }
  data.source = 'prewritten-fallback';
  const outputPath = path.join(process.cwd(), 'public', 'data', 'daily-horoscope.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log('✅ Pre‑written fallback deployed.');
  process.exit(0);
}

// ---------- Dynamic fallback (seeded random) ----------
console.log('🔄 No pre‑written fallback found; using dynamic generation.');

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
function pick(arr, seed) { return arr[Math.floor(seededRandom(seed) * arr.length)]; }

const content = {
  education: {
    positive: [
      "Your concentration is razor‑sharp today. Complex subjects feel approachable, and you may crack a problem that has been bothering you for weeks. Teachers and mentors will be impressed by your dedication.",
      "A sudden insight during a lecture or while reading will unlock a new level of understanding. Write it down immediately – it may become the seed of a larger project.",
      "Group study or collaborative work is highly favoured. Your ability to explain concepts to others will reinforce your own knowledge.",
    ],
    negative: [
      "Restlessness could make it hard to sit still. Break your study sessions into 25‑minute chunks with short breaks to maintain focus.",
      "A tendency to daydream or procrastinate may delay important submissions. Create a strict schedule and stick to it.",
      "Comparing yourself to peers may cause self‑doubt. Remember that everyone's path is unique.",
    ],
  },
  love: {
    positive: [
      "The air is thick with romance. An unexpected message from someone special could reignite old feelings. For singles, a casual meeting may lead to something meaningful.",
      "Your partner will appreciate your extra effort today. A small gift or a heartfelt note will deepen your bond.",
      "A difficult conversation that you have been avoiding will finally take place, and the outcome will be surprisingly positive.",
    ],
    negative: [
      "Insecurity may whisper lies into your ear. Trust what your partner says, not what your fears imagine.",
      "A minor disagreement could escalate if you let pride take the lead. Listen more than you speak today.",
      "For those in long‑distance relationships, the distance may feel heavier than usual. Schedule a video call to bridge the gap.",
    ],
  },
  career: {
    positive: [
      "Your leadership skills are in the spotlight. A senior colleague may entrust you with a high‑visibility project. Accept it confidently.",
      "Networking opportunities abound. A casual conversation at lunch could lead to a promising collaboration.",
      "Financial rewards from past efforts may arrive today. Consider saving a portion for future investments.",
    ],
    negative: [
      "Office politics could drain your energy. Stay focused on your goals and avoid gossip.",
      "A sudden change in plans might throw your schedule off balance. Adaptability is your superpower today.",
      "If you have been waiting for a promotion or a response, delays are possible. Patience is key.",
    ],
  },
  health: {
    positive: [
      "Vitality surges through you. It's an excellent day to start a new fitness routine or join a yoga class.",
      "Mental clarity makes it easier to meditate or practice mindfulness. Even 10 minutes will make a difference.",
      "A chronic issue may show signs of relief. Continue your current treatment; the results are encouraging.",
    ],
    negative: [
      "Digestive problems may arise if you eat out. Stick to light, home‑cooked meals.",
      "Stress could manifest as tension headaches. Take a 5‑minute breathing break every hour.",
      "Sleep quality might be disturbed by overthinking. Avoid screens an hour before bed.",
    ],
  },
  finance: {
    positive: [
      "A stalled payment is likely to be released. Use it to clear pending bills or invest in a safe instrument.",
      "An investment made months ago may show unexpected profits. Reinvest wisely.",
      "It's a good day to review your budget and identify areas where you can save more.",
    ],
    negative: [
      "Avoid lending money to friends; it could strain relationships if not returned on time.",
      "Impulsive online shopping may dent your wallet. Unsubscribe from tempting newsletters for a while.",
      "Speculative trading is risky today. Stick to fixed deposits or blue‑chip stocks.",
    ],
  },
  family: {
    positive: [
      "A family elder will share a story that inspires you. Spend quality time with them; their blessings are powerful.",
      "A younger sibling may seek your guidance. Your advice could shape their future positively.",
      "A long‑standing property matter may finally see progress. Cooperation from all parties is indicated.",
    ],
    negative: [
      "A misunderstanding with your spouse could arise from a trivial matter. Apologise quickly, even if you are right.",
      "Teenagers in the house may test your patience. Set boundaries with love, not anger.",
      "Avoid discussing sensitive topics at dinner; keep the atmosphere light and cheerful.",
    ],
  },
  remedy: {
    action: [
      "Chant the Hanuman Chalisa thrice today and offer a garland of marigold to Lord Hanuman.",
      "Offer water to the rising Sun while reciting the Gayatri Mantra 11 times.",
      "Donate red lentils and jaggery to a temple or to the needy.",
      "Light a ghee lamp in front of your family deity in the evening.",
      "Feed green grass or spinach to cows; it pacifies malefic planetary influences.",
      "Wear a yellow cloth or keep a yellow flower on your desk for positivity.",
      "Observe a fast from sunrise to moonrise and break it with sweet rice.",
      "Plant a Tulsi sapling and water it daily; it brings harmony at home.",
      "Read Chapter 12 of the Bhagavad Gita aloud to reduce mental stress.",
      "Give away old clothes or blankets to the poor; it removes obstacles.",
    ],
    gemstone: [
      "Red Coral (Moonga) for Mars‑related challenges.",
      "Pearl (Moti) for Moon‑related anxiety.",
      "Emerald (Panna) for Mercury‑related communication blocks.",
      "Yellow Sapphire (Pukhraj) for Jupiter's blessings.",
      "Diamond or Zircon (Heera) for Venus‑related relationship issues.",
      "Blue Sapphire (Neelam) for Saturn's delays.",
    ],
  },
};

function generateSections(sign, seedBase) {
  const aspects = ['education', 'love', 'career', 'health', 'finance', 'family'];
  const sections = [];

  for (const aspect of aspects) {
    const posSeed = seedBase + aspects.indexOf(aspect) * 13;
    const negSeed = seedBase + aspects.indexOf(aspect) * 17;
    const positive = pick(content[aspect].positive, posSeed);
    const negative = pick(content[aspect].negative, negSeed);
    sections.push({
      aspect: aspect.charAt(0).toUpperCase() + aspect.slice(1),
      positive,
      negative,
      image: `/assets/images/aspect-${aspect}.webp`,
      cta: '/contact',
    });
  }

  const remedyAction = pick(content.remedy.action, seedBase + 31);
  const remedyGem = pick(content.remedy.gemstone, seedBase + 37);
  sections.push({
    aspect: 'Remedy',
    positive: `${remedyAction} For additional support, consider wearing ${remedyGem}.`,
    negative: "If challenges persist, a personalised consultation can reveal the specific planetary remedies for your birth chart.",
    image: '/assets/images/aspect-remedy.webp',
    cta: '/contact',
  });

  return sections;
}

const horoscopes = {};
for (const sign of signs) {
  const seedBase = dayIndex * 100 + signs.indexOf(sign);
  horoscopes[sign] = {
    moonSign: moonSign,
    sections: generateSections(sign, seedBase),
  };
}

const data = {
  date: istNow.toISOString().slice(0, 10),
  moon_sign: moonSign,
  horoscopes,
  lucky_color: ['Saffron','Red','Yellow'][signs.indexOf(moonSign) % 3],
  lucky_number: (signs.indexOf(moonSign) + 5) % 9 + 1,
  source: 'dynamic-fallback',
};

const outputPath = path.join(process.cwd(), 'public', 'data', 'daily-horoscope.json');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
console.log('✅ Dynamic fallback horoscope generated.');
