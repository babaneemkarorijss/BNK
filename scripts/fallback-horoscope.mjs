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
const dayIndex = dayOfYear % 7;   // 0-6 for 7 days
const moonSign = getMoonSign(istNow);

// Pre-written fallback
const prewrittenPath = path.join(process.cwd(), 'public', 'data', 'fallback', `day${dayIndex}.json`);
if (fs.existsSync(prewrittenPath)) {
  console.log(`📅 Using pre-written fallback for day index ${dayIndex}`);
  const content = fs.readFileSync(prewrittenPath, 'utf8');
  const data = JSON.parse(content);
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
  console.log('✅ Pre-written fallback deployed.');
  process.exit(0);
}

// Dynamic fallback (seeded random)
console.log('🔄 No pre-written fallback found; using dynamic generation.');
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
function pick(arr, seed) { return arr[Math.floor(seededRandom(seed) * arr.length)]; }

const content = {
  education: {
    positive: [
      "Your concentration is razor-sharp today. Complex subjects feel approachable, and you may crack a problem that has been bothering you for weeks.",
      "A sudden insight during a lecture will unlock a new level of understanding. Write it down immediately.",
      "Group study or collaborative work is highly favoured. Your ability to explain concepts will reinforce your own knowledge.",
    ],
    negative: [
      "Restlessness could make it hard to sit still. Break study sessions into 25-minute chunks with short breaks.",
      "A tendency to daydream may delay important submissions. Create a strict schedule and stick to it.",
      "Comparing yourself to peers may cause self-doubt. Remember that everyone's path is unique.",
    ],
  },
  love: {
    positive: [
      "An unexpected romantic gesture from your partner will brighten your day. Singles may meet someone through a common friend.",
      "The energy is perfect for deepening emotional bonds. Express your feelings openly.",
      "A past misunderstanding is likely to be resolved today, bringing harmony in relationships.",
    ],
    negative: [
      "Insecurity may whisper lies into your ear. Trust what your partner says, not what your fears imagine.",
      "A minor disagreement could escalate if you let pride take the lead. Listen more than you speak.",
      "For those in long-distance relationships, the distance may feel heavier than usual. Schedule a video call.",
    ],
  },
  career: {
    positive: [
      "Your leadership skills will be recognized. A new project may come your way.",
      "Networking will open doors. Attend that meeting or seminar you've been invited to.",
      "Financial gains through previous investments are indicated. Consider a side hustle.",
    ],
    negative: [
      "Office politics could drain your energy. Stay focused on your goals and avoid gossip.",
      "A sudden change in plans might throw your schedule off balance. Adaptability is your superpower.",
      "If you have been waiting for a promotion or a response, delays are possible. Patience is key.",
    ],
  },
  health: {
    positive: [
      "Your energy levels will be high. Channel them into physical activity.",
      "Mental clarity is at its peak. Meditation or yoga will amplify this benefit.",
      "A chronic ailment may show signs of improvement. Continue your prescribed regimen.",
    ],
    negative: [
      "Digestive issues could arise from irregular eating habits. Stick to home-cooked meals.",
      "Mental stress may manifest as headaches. Take short breaks during work.",
      "Sleep quality might be disturbed by overthinking. Avoid screens an hour before bed.",
    ],
  },
  finance: {
    positive: [
      "A stalled payment is likely to be released. Clear pending dues if possible.",
      "An investment made in the past may show profits today. Consider reinvesting.",
      "It's a good day to review your budget and cut unnecessary expenses.",
    ],
    negative: [
      "Avoid lending money to friends or relatives; you may not get it back soon.",
      "Impulsive shopping could strain your finances. Stick to the list.",
      "Speculative trading should be avoided; stick to safe instruments.",
    ],
  },
  family: {
    positive: [
      "A family gathering will bring joy. Spend quality time with elders.",
      "A younger sibling may seek your advice; guide them with love.",
      "The day is ideal for resolving property or inheritance disputes.",
    ],
    negative: [
      "A misunderstanding with a family member could spoil the mood. Choose your words carefully.",
      "Avoid discussing sensitive topics at the dinner table.",
      "Your spouse may need your support more than usual; be present.",
    ],
  },
  remedy: {
    action: [
      "Chant the Hanuman Chalisa thrice today for protection and prosperity.",
      "Offer water to the Sun at sunrise and recite the Gayatri Mantra.",
      "Donate red lentils to a temple or a person in need.",
      "Light a ghee lamp in front of Lord Hanuman's image in the evening.",
      "Feed jaggery and gram to cows today; it pacifies malefic planets.",
      "Wear a yellow cloth or keep a yellow flower in your workspace for positive energy.",
      "Fast from sunrise to moonrise and offer prayers to Lord Shiva.",
      "Plant a tulsi sapling and water it daily; it brings harmony at home.",
      "Read a chapter from the Bhagavad Gita aloud; it reduces mental stress.",
      "Give away old clothes to the poor; it removes obstacles.",
    ],
    gemstone: [
      "Red Coral for Mars-related issues.",
      "Pearl for Moon-related anxiety.",
      "Emerald for Mercury-related communication blocks.",
      "Yellow Sapphire for Jupiter's blessings.",
      "Diamond or Zircon for Venus-related relationship issues.",
      "Blue Sapphire for Saturn's delays.",
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
