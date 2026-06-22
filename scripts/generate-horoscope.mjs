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
const SIGNS = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
function getMoonSign(date) {
  const jd = julian.CalendarGregorianToJD(date.getFullYear(), date.getMonth()+1, date.getDate(), 5, 30, 0);
  const moon = moonposition.position(jd);
  const ayanamsa = (23.85 + 0.013 * ((jd - 2451545.0)/36525)) * Math.PI / 180;
  const sidereal = moon.lon - ayanamsa;
  return SIGNS[Math.floor((sidereal * 180 / Math.PI) / 30) % 12];
}
async function generateForSign(sign, moonSign) {
  const prompt = `You are a Vedic astrologer and devotee of Neem Karori Baba. Today's Moon is in ${moonSign}. Write a daily horoscope for Moon sign ${sign}. Keep it under 150 words, inspiring, with a simple remedy. Plain text.`;
  for (let i=0; i<3; i++) {
    try {
      const res = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama3-8b-8192',
        temperature: 0.9, max_tokens: 250,
      });
      return res.choices[0].message.content.trim();
    } catch (e) {
      await new Promise(r => setTimeout(r, 5000 * (i+1)));
    }
  }
  return `Dear ${sign}, remember Babaji's words: "Love everyone, serve everyone, remember God."`;
}
(async () => {
  const today = new Date();
  const moon = getMoonSign(today);
  console.log(`🌙 Moon: ${moon}`);
  const horoscopes = {};
  for (const sign of SIGNS) {
    console.log(`  Generating for ${sign}...`);
    horoscopes[sign] = await generateForSign(sign, moon);
    await new Promise(r => setTimeout(r, 15000));
  }
  const data = { date: today.toISOString().slice(0,10), moon_sign: moon, horoscopes, lucky_color: 'Saffron', lucky_number: 5 };
  fs.mkdirSync('public/data', { recursive: true });
  fs.writeFileSync('public/data/daily-horoscope.json', JSON.stringify(data, null, 2));
  console.log('✅ Horoscope generated.');
})();
