import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { julian, moonposition } = require('astronomia');
import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';

// ─── Configuration ───────────────────────────────────────────
const GROQ_API_KEY = process.env.GROQ_API_KEY;
if (!GROQ_API_KEY) {
  console.error('❌ GROQ_API_KEY environment variable is not set.');
  process.exit(1);
}

const groq = new Groq({ apiKey: GROQ_API_KEY });

// Primary model – can be overridden via environment variable
const PRIMARY_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

// Fallback chain – if a model is decommissioned, the next one is tried automatically
const MODEL_CHAIN = [
  PRIMARY_MODEL,
  'meta-llama/llama-4-scout-17b-16e-instruct',
  'mixtral-8x7b-32768',
];

// Only retry on transient errors (rate limit, network), not on permanent ones
const MAX_TRANSIENT_RETRIES = 3;
const RETRY_DELAY_BASE = 3_000; // 3 seconds

const SIGNS = [
  'aries','taurus','gemini','cancer','leo','virgo',
  'libra','scorpio','sagittarius','capricorn','aquarius','pisces'
];

// ─── Astronomy helpers ───────────────────────────────────────
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

// ─── Generation logic ────────────────────────────────────────
async function generateHoroscopeForSign(sign, moonSignToday) {
  const systemPrompt = `You are a wise Vedic astrologer and devoted follower of Shri Neem Karori Baba. 
Today the Moon is transiting the sign ${moonSignToday}. 
Write a daily horoscope for a person whose Moon sign (Rashi) is ${sign}. 
Make it personal, inspiring, and full of Babaji's love. Include a simple remedy. 
Keep it under 150 words. Do NOT use markdown. Just plain text.`;

  for (const model of MODEL_CHAIN) {
    // Transient‑error retry loop for this specific model
    for (let attempt = 1; attempt <= MAX_TRANSIENT_RETRIES; attempt++) {
      try {
        const completion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Horoscope for ${sign}` }
          ],
          model: model,
          temperature: 0.9,
          max_tokens: 250,
          top_p: 1,
        });

        const text = completion.choices[0]?.message?.content?.trim();
        if (text) return text;
        throw new Error('Empty response from Groq');
      } catch (error) {
        const status = error?.status || error?.error?.code || '';

        // Permanent errors – no retry, skip to next model immediately
        if (status === 400 || status === 404 || status === 'model_decommissioned') {
          console.warn(`   ⚠️ Model ${model} is decommissioned or invalid. Switching to next model.`);
          break; // exit retry loop, go to next model in chain
        }

        // Transient errors – retry with backoff
        console.warn(`   ⚠️ Transient error for ${model} (attempt ${attempt}/${MAX_TRANSIENT_RETRIES}): ${error.message}`);
        if (attempt < MAX_TRANSIENT_RETRIES) {
          const delay = RETRY_DELAY_BASE * attempt;
          console.log(`   🔄 Retrying in ${delay / 1000}s...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    // If we get here, all retries for this model failed – loop continues to next model
  }

  // All models exhausted
  console.error(`   ❌ All models failed for ${sign}. Using fallback message.`);
  return `Today, dear ${sign}, remember Babaji's words: "Love everyone, serve everyone, remember God." Chant Ram Ram and be at peace.`;
}

// ─── Main ────────────────────────────────────────────────────
(async () => {
  console.log('🌙 Starting daily horoscope generation (AI primary)...');
  const today = new Date();
  const istDate = new Date(today.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const moonSign = getMoonSign(istDate);
  console.log(`   Moon sign today (IST): ${moonSign}`);

  const horoscopes = {};
  for (const sign of SIGNS) {
    console.log(`📜 Generating for ${sign}...`);
    horoscopes[sign] = await generateHoroscopeForSign(sign, moonSign);

    // 15‑second gap between signs to stay far below rate limits
    if (sign !== SIGNS[SIGNS.length - 1]) {
      console.log('   ⏳ Waiting 15 seconds before next sign...');
      await new Promise(resolve => setTimeout(resolve, 15_000));
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
