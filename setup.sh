#!/usr/bin/env bash
set -Eeuo pipefail
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'
log() { echo -e "${GREEN}✔ $1${NC}"; }
warn() { echo -e "${RED}✖ $1${NC}"; }

# 1. Save any local uncommitted work
if ! git diff-index --quiet HEAD --; then
    log "Stashing uncommitted changes..."
    git stash push -m "auto-stash before pull"
    STASHED=1
else
    STASHED=0
fi

# 2. Pull latest from remote, rebasing to keep history clean
log "Pulling latest changes from origin..."
if ! git pull --rebase origin master; then
    warn "Rebase failed. Please resolve conflicts manually, then run:"
    warn "  git rebase --continue"
    warn "  git push"
    exit 1
fi

# 3. Restore stashed changes (if any)
if [ "$STASHED" -eq 1 ]; then
    log "Restoring stashed changes..."
    git stash pop || warn "Could not pop stash (possibly no stash). Continuing..."
fi

# 4. Ensure the self-healing generator is in place (idempotent)
if ! grep -q "llama-3.3-70b-versatile" scripts/generate-horoscope.mjs; then
    log "Updating generator to self-healing version..."
    cat <<'GENFIX' > scripts/generate-horoscope.mjs
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
const PRIMARY_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
const MODEL_CHAIN = [
  PRIMARY_MODEL,
  'meta-llama/llama-4-scout-17b-16e-instruct',
  'mixtral-8x7b-32768',
];
const MAX_RETRIES = 3;
const SIGNS = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];

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

async function generate(sign, moon) {
  const system = `You are a Vedic astrologer and devotee of Neem Karori Baba. Moon in ${moon}. Horoscope for ${sign}. Under 150 words, plain text.`;
  for (const model of MODEL_CHAIN) {
    for (let i = 1; i <= MAX_RETRIES; i++) {
      try {
        const res = await groq.chat.completions.create({
          messages: [{ role: 'system', content: system }, { role: 'user', content: `Horoscope for ${sign}` }],
          model, temperature: 0.9, max_tokens: 250,
        });
        const text = res.choices[0]?.message?.content?.trim();
        if (text) return text;
      } catch (e) {
        if (e?.status === 400 || e?.status === 404 || e?.error?.code === 'model_decommissioned') break;
        if (i < MAX_RETRIES) await new Promise(r => setTimeout(r, 3000 * i));
      }
    }
  }
  return `Today, dear ${sign}, remember Babaji: "Love everyone, serve everyone, remember God."`;
}

(async () => {
  const today = new Date();
  const ist = new Date(today.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const moon = getMoonSign(ist);
  console.log('Moon:', moon);
  const horoscopes = {};
  for (const sign of SIGNS) {
    console.log(sign);
    horoscopes[sign] = await generate(sign, moon);
    if (sign !== SIGNS[SIGNS.length - 1]) await new Promise(r => setTimeout(r, 15000));
  }
  const data = { date: ist.toISOString().slice(0,10), moon_sign: moon, horoscopes, lucky_color: 'Saffron', lucky_number: 5 };
  fs.mkdirSync('public/data', { recursive: true });
  fs.writeFileSync('public/data/daily-horoscope.json', JSON.stringify(data, null, 2));
  console.log('✅ Generated.');
})();
GENFIX
    git add scripts/generate-horoscope.mjs
else
    log "Generator already up-to-date."
fi

# 5. Commit any remaining changes (if any)
if ! git diff-index --quiet HEAD --; then
    git add .
    git commit -m "Sync and finalize updates"
fi

# 6. Push to origin
log "Pushing to origin..."
git push origin master

echo ""
echo "✅ All done – repository is synced and pushed."
echo "   The self-healing horoscope generator is active."
echo "   If you haven't already, add GROQ_API_KEY to GitHub Secrets."