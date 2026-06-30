import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { julian, moonposition } = require('astronomia');
import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  console.error('❌ GROQ_API_KEY not set');
  process.exit(1);
}
const groq = new Groq({ apiKey: GROQ_API_KEY });

// Reliable model chain – gemma2‑9b‑it is free, fast, and stable
const MODEL_CHAIN = [
  'gemma2-9b-it',               // primary – fast & free
  'llama-3.3-70b-versatile',    // backup #1
  'meta-llama/llama-4-scout-17b-16e-instruct'  // backup #2
];

const SIGNS = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];

// True sidereal moon sign
function lahiriAyanamsa(jd) {
  const t = (jd - 2451545.0) / 36525;
  return (23.85 + 0.013 * t) * Math.PI / 180;
}
function getMoonSign(date) {
  const jd = julian.CalendarGregorianToJD(date.getFullYear(), date.getMonth()+1, date.getDate(), 5,30,0);
  const moon = moonposition.position(jd);
  const ayanamsa = lahiriAyanamsa(jd);
  const sidereal = moon.lon - ayanamsa;
  return SIGNS[Math.floor((sidereal * 180 / Math.PI) / 30) % 12];
}

// Backoff delays (exponential)
const BACKOFF = [5000, 10000, 20000];

async function generateOne(sign, moon) {
  const system = `You are a Vedic astrologer and devotee of Neem Karori Baba. The Moon is in ${moon} today. Write a horoscope for Moon sign ${sign}. Under 150 words, inspiring, include a remedy. Plain text.`;

  for (const model of MODEL_CHAIN) {
    for (let attempt = 0; attempt < BACKOFF.length; attempt++) {
      try {
        const res = await groq.chat.completions.create({
          messages: [{ role: 'system', content: system }, { role: 'user', content: `Horoscope for ${sign}` }],
          model,
          temperature: 0.9,
          max_tokens: 250,
        });
        const text = res.choices[0]?.message?.content?.trim();
        if (text) return text;
      } catch (e) {
        const code = e?.status || e?.error?.code || '';
        // Permanent error – skip model
        if (code === 400 || code === 404 || code === 'model_decommissioned') break;
        // Transient – backoff
        if (attempt < BACKOFF.length - 1) {
          console.warn(`   ⚠️ ${model} attempt ${attempt+1} failed, retrying in ${BACKOFF[attempt]/1000}s…`);
          await new Promise(r => setTimeout(r, BACKOFF[attempt]));
        }
      }
    }
    console.warn(`   ⚠️ Model ${model} exhausted.`);
  }
  // Ultimate fallback
  return `Today, dear ${sign}, remember Babaji's words: "Love everyone, serve everyone, remember God." Chant Ram Ram and be at peace.`;
}

(async () => {
  const today = new Date();
  const ist = new Date(today.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const moon = getMoonSign(ist);
  console.log('🌙 Moon sign (IST):', moon);

  const horoscopes = {};
  for (const sign of SIGNS) {
    console.log(`📜 Generating ${sign}…`);
    horoscopes[sign] = await generateOne(sign, moon);
    if (sign !== SIGNS[SIGNS.length-1]) {
      console.log('   ⏳ 12s gap…');
      await new Promise(r => setTimeout(r, 12000));
    }
  }

  const data = {
    date: ist.toISOString().slice(0,10),
    moon_sign: moon,
    horoscopes,
    lucky_color: ['Saffron','Red','Yellow'][SIGNS.indexOf(moon) % 3],
    lucky_number: (SIGNS.indexOf(moon) + 5) % 9 + 1,
  };

  fs.mkdirSync('public/data', { recursive: true });
  fs.writeFileSync('public/data/daily-horoscope.json', JSON.stringify(data, null, 2));
  console.log('✅ Horoscope generated.');
})();
