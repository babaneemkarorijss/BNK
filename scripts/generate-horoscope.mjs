import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { julian, moonposition } = require('astronomia');
import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';

// ---------- CONFIG ----------
const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  console.error('❌ GROQ_API_KEY environment variable not set.');
  process.exit(1);
}

const groq = new Groq({ apiKey: GROQ_API_KEY });
const MODEL = 'llama3-8b-8192';           // free & fast
const MAX_RETRIES = 3;
const DELAY_BETWEEN_SIGNS = 15000;       // 15 seconds (free tier RPM ~30, TPM ~6000)
const SIGNS = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];

// ---------- ASTRONOMY HELPERS ----------
function lahiriAyanamsa(jd) {
  const t = (jd - 2451545.0) / 36525;
  return (23.85 + 0.013 * t) * Math.PI / 180;
}

function getMoonSign(date) {
  const jd = julian.CalendarGregorianToJD(date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds());
  const moon = moonposition.position(jd);
  const eclipticLong = moon.lon;
  const ayanamsa = lahiriAyanamsa(jd);
  const siderealLong = eclipticLong - ayanamsa;
  const signIndex = Math.floor((siderealLong * 180 / Math.PI) / 30) % 12;
  return SIGNS[signIndex];
}

// ---------- TOKEN MANAGEMENT ----------
class TokenManager {
  constructor() {
    this.remainingTokens = null;
    this.resetTime = null;
  }

  updateFromHeaders(headers) {
    if (headers['x-ratelimit-remaining-tokens']) {
      this.remainingTokens = parseInt(headers['x-ratelimit-remaining-tokens'], 10);
    }
    if (headers['x-ratelimit-reset-requests']) {
      // Groq uses custom headers, but we can use 'retry-after' if present
      if (headers['retry-after']) {
        this.resetTime = Date.now() + parseInt(headers['retry-after'], 10) * 1000;
      }
    }
  }

  async waitIfNeeded() {
    if (this.remainingTokens !== null && this.remainingTokens < 200) {
      console.log(`⏳ Low tokens (${this.remainingTokens}), waiting 60s…`);
      await new Promise(resolve => setTimeout(resolve, 60000));
    }
  }
}

const tokenMgr = new TokenManager();

// ---------- API CALL WITH RETRY ----------
async function generateHoroscopeForSign(sign, moonSignToday) {
  const prompt = `You are a wise Vedic astrologer and devoted follower of Shri Neem Karori Baba. 
Today's Moon is transiting the sign ${moonSignToday}. Write a daily horoscope for a person whose Moon sign (Rashi) is ${sign}. 
Make it personal, inspiring, and full of Babaji's love. Include a simple remedy. 
Keep it under 150 words. Do NOT use markdown. Just plain text.`;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      await tokenMgr.waitIfNeeded();
      const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: MODEL,
        temperature: 0.9,
        max_tokens: 250,
        top_p: 1,
      });
      // Update token info from headers if available (Groq SDK may expose it)
      // For simplicity, we approximate usage from response.usage
      if (completion.usage) {
        tokenMgr.remainingTokens = Math.max((tokenMgr.remainingTokens || 6000) - completion.usage.total_tokens, 0);
      }
      const text = completion.choices[0]?.message?.content?.trim();
      if (text) return text;
    } catch (error) {
      console.warn(`⚠ Attempt ${attempt + 1} failed for ${sign}:`, error.message);
      if (attempt < MAX_RETRIES - 1) {
        await new Promise(r => setTimeout(r, 5000 * (attempt + 1)));
      }
    }
  }
  return `Today, dear ${sign}, remember Babaji's words: "Love everyone, serve everyone, remember God." Chant Ram Ram.`;
}

// ---------- MAIN ----------
(async () => {
  const today = new Date();
  // Ensure we generate for *tomorrow* if running near midnight? No, we want current day.
  const moonSign = getMoonSign(today);
  console.log(`🌙 Moon sign today: ${moonSign}`);

  const horoscopes = {};
  console.log('🔄 Generating horoscopes one by one with token-aware delays…');

  for (const sign of SIGNS) {
    console.log(`   📜 Generating for ${sign}...`);
    const prediction = await generateHoroscopeForSign(sign, moonSign);
    horoscopes[sign] = prediction;
    // Gentle delay to respect rate limit
    console.log(`   ⏸ Waiting ${DELAY_BETWEEN_SIGNS / 1000}s before next sign...`);
    await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_SIGNS));
  }

  const data = {
    date: today.toISOString().slice(0,10),
    moon_sign: moonSign,
    horoscopes,
    lucky_color: ['Saffron','Red','Yellow'][SIGNS.indexOf(moonSign) % 3],
    lucky_number: (SIGNS.indexOf(moonSign) + 5) % 9 + 1,
  };

  const outputPath = path.join(process.cwd(), 'public', 'data', 'daily-horoscope.json');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log('✅ Daily horoscope generated successfully!');
})();
