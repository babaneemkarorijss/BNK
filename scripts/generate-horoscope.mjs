import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { julian, moonposition } = require('astronomia');
import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';

// ─── API Keys ─────────────────────────────────────────────
const GROQ_KEY = process.env.GROQ_API_KEY || '';
const ZHIPU_KEY = process.env.ZHIPU_API_KEY || '';

// ─── Groq Client ──────────────────────────────────────────
let groq = null;
if (GROQ_KEY) groq = new Groq({ apiKey: GROQ_KEY });

// ─── Zhipu API ────────────────────────────────────────────
async function callZhipu(messages) {
  if (!ZHIPU_KEY) throw new Error('No Zhipu API key');
  const res = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${ZHIPU_KEY}` },
    body: JSON.stringify({
      model: 'glm-4-flash',
      messages,
      temperature: 0.9,
      max_tokens: 250,
    }),
  });
  if (!res.ok) throw new Error(`Zhipu HTTP ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content.trim();
}

// ─── Models chain ─────────────────────────────────────────
const MODELS = [
  { name: 'groq-gemma2-9b-it', fn: async (msgs) => {
    if (!groq) throw new Error('No Groq client');
    const res = await groq.chat.completions.create({ messages: msgs, model: 'gemma2-9b-it', temperature: 0.9, max_tokens: 250 });
    return res.choices[0].message.content.trim();
  }},
  { name: 'groq-llama3.3-70b', fn: async (msgs) => {
    if (!groq) throw new Error('No Groq client');
    const res = await groq.chat.completions.create({ messages: msgs, model: 'llama-3.3-70b-versatile', temperature: 0.9, max_tokens: 250 });
    return res.choices[0].message.content.trim();
  }},
  { name: 'zhipu-glm4-flash', fn: callZhipu },
];

// ─── Astronomy helpers ────────────────────────────────────
const SIGNS = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
function lahiriAyanamsa(jd) { const t = (jd - 2451545.0) / 36525; return (23.85 + 0.013 * t) * Math.PI / 180; }
function getMoonSign(date) {
  const jd = julian.CalendarGregorianToJD(date.getFullYear(), date.getMonth()+1, date.getDate(), 5,30,0);
  const moon = moonposition.position(jd);
  const ayanamsa = lahiriAyanamsa(jd);
  const sidereal = moon.lon - ayanamsa;
  return SIGNS[Math.floor((sidereal * 180 / Math.PI) / 30) % 12];
}

// ─── Generate one sign ────────────────────────────────────
async function generateOne(sign, moon) {
  const messages = [
    { role: 'system', content: `You are a Vedic astrologer and devotee of Neem Karori Baba. The Moon is in ${moon} today. Write a daily horoscope for Moon sign ${sign}. Under 150 words, inspiring, include a simple remedy. Plain text.` },
    { role: 'user', content: `Horoscope for ${sign}` },
  ];

  for (const model of MODELS) {
    try {
      const text = await model.fn(messages);
      if (text) return text;
    } catch (e) {
      console.warn(`   ⚠️ ${model.name} failed: ${e.message}`);
    }
  }

  // Ultimate fallback
  return `Today, dear ${sign}, remember Babaji's words: "Love everyone, serve everyone, remember God." Chant Ram Ram and be at peace.`;
}

// ─── Main ─────────────────────────────────────────────────
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
      console.log('   ⏳ 15s gap…');
      await new Promise(r => setTimeout(r, 15000));
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
