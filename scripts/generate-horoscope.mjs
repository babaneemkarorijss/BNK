import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { julian, moonposition } = require('astronomia');
import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';

// ---------- CONFIG ----------
const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  console.error('❌ GROQ_API_KEY environment variable is not set.');
  process.exit(1);
}

const groq = new Groq({ apiKey: GROQ_API_KEY });
const MODEL = 'llama3-8b-8192';
const MAX_RETRIES = 3;
const DELAY_BETWEEN_SIGNS = 15_000;
const SIGNS = [
  'aries','taurus','gemini','cancer','leo','virgo',
  'libra','scorpio','sagittarius','capricorn','aquarius','pisces'
];

function lahiriAyanamsa(jd) {
  const t = (jd - 2451545.0) / 36525;
  return (23.85 + 0.013 * t) * Math.PI / 180;
}

function getMoonSign(date) {
  const jd = julian.CalendarGregorianToJD(
    date.getFullYear(), date.getMonth() + 1, date.getDate(),
    date.getHours(), date.getMinutes(), date.getSeconds()
  );
  const moon = moonposition.position(jd);
  const eclipticLong = moon.lon;
  const ayanamsa = lahiriAyanamsa(jd);
  const siderealLong = eclipticLong - ayanamsa;
  const signIndex = Math.floor((siderealLong * 180 / Math.PI) / 30) % 12;
  return SIGNS[signIndex];
}

class TokenManager {
  constructor() {
    this.totalTokensUsed = 0;
  }

  async sleepIfNeeded() {
    if (this.totalTokensUsed > 5000) {
      console.log('⏸ Approaching token limit, pausing 30s...');
      await new Promise(resolve => setTimeout(resolve, 30_000));
      this.totalTokensUsed = 0;
    }
  }
}

const tokenMgr = new TokenManager();

async function generateHoroscopeForSign(sign, moonSignToday) {
  const systemPrompt = `You are a wise Vedic astrologer and devoted follower of Shri Neem Karori Baba. 
Today the Moon is transiting the sign ${moonSignToday}. 
Write a daily horoscope for a person whose Moon sign (Rashi) is ${sign}. 
Make it personal, inspiring, and full of Babaji's love. Include a simple remedy. 
Keep it under 150 words. Do NOT use markdown. Just plain text.`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await tokenMgr.sleepIfNeeded();
      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Horoscope for ${sign}` }
        ],
        model: MODEL,
        temperature: 0.9,
        max_tokens: 250,
        top_p: 1,
      });

      const usage = completion.usage?.total_tokens || 0;
      tokenMgr.totalTokensUsed += usage;
      console.log(`   ✅ ${sign} – tokens used: ${usage} (total: ${tokenMgr.totalTokensUsed})`);

      const text = completion.choices[0]?.message?.content?.trim();
      if (text) return text;
      throw new Error('Empty response from Groq');
    } catch (error) {
      console.warn(`   ⚠️ Attempt ${attempt} failed for ${sign}: ${error.message}`);
      if (attempt < MAX_RETRIES) {
        const backoff = 5000 * attempt;
        console.log(`   🔄 Retrying in ${backoff / 1000}s...`);
        await new Promise(resolve => setTimeout(resolve, backoff));
      }
    }
  }

  console.error(`   ❌ All retries exhausted for ${sign}. Using fallback message.`);
  return `Today, dear ${sign}, remember Babaji's words: "Love everyone, serve everyone, remember God." Chant Ram Ram and be at peace.`;
}

(async () => {
  console.log('🌙 Starting daily horoscope generation...');
  const today = new Date();
  const istDate = new Date(today.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const moonSign = getMoonSign(istDate);
  console.log(`   Moon sign today (IST): ${moonSign}`);

  const horoscopes = {};
  for (const sign of SIGNS) {
    console.log(`📜 Generating for ${sign}...`);
    horoscopes[sign] = await generateHoroscopeForSign(sign, moonSign);

    if (sign !== SIGNS[SIGNS.length - 1]) {
      console.log(`   ⏳ Waiting ${DELAY_BETWEEN_SIGNS / 1000}s before next sign...`);
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_SIGNS));
    }
  }

  const data = {
    date: today.toISOString().slice(0, 10),
    moon_sign: moonSign,
    horoscopes,
    lucky_color: ['Saffron', 'Red', 'Yellow'][SIGNS.indexOf(moonSign) % 3],
    lucky_number: (SIGNS.indexOf(moonSign) + 5) % 9 + 1,
  };

  const outputPath = path.join(process.cwd(), 'public', 'data', 'daily-horoscope.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log('✅ Daily horoscope successfully generated!');
  console.log(`   Saved to ${outputPath}`);
})();
