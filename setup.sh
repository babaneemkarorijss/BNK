#!/usr/bin/env bash
# -------------------------------------------------------------------
#  SHRI NEEM KARORI BABA SANSTHAN – PRODUCTION SETUP
#  Version: 2.0.0 – Full Groq AI horoscope, batched updates, AEO/GEO/SEO
#  Run: chmod +x setup.sh && ./setup.sh
# -------------------------------------------------------------------
set -Eeuo pipefail
shopt -s inherit_errexit nullglob

# --- Colours ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# --- Helper functions ---
log()   { echo -e "${GREEN}✔ $1${NC}"; }
warn()  { echo -e "${YELLOW}⚠ $1${NC}"; }
err()   { echo -e "${RED}✖ $1${NC}"; exit 1; }

# --- Pre‑checks ---
command -v node >/dev/null 2>&1 || err "Node.js is required (https://nodejs.org)"
command -v npm >/dev/null 2>&1  || err "npm is required"
command -v git >/dev/null 2>&1  || err "Git is required"

# --- Ensure we are not overwriting an existing project ---
if [ -f package.json ]; then
  warn "package.json already exists. This script is meant for a fresh directory."
  read -rp "Continue anyway? (y/N) " confirm
  [[ "$confirm" =~ ^[Yy]$ ]] || exit 0
fi

log "🚩 Starting setup for Shri Neem Karori Baba Sansthan …"

# 1. Create package.json with exact versions
cat <<'EOF' > package.json
{
  "name": "neem-karori-baba-sansthan",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "gen-horoscope": "node scripts/generate-horoscope.mjs"
  },
  "dependencies": {
    "next": "16.2.7",
    "react": "19.2.7",
    "react-dom": "19.2.7",
    "framer-motion": "11.18.2",
    "lucide-react": "0.468.0",
    "next-seo": "6.6.0",
    "@mlc-ai/web-llm": "0.2.46",
    "@xenova/transformers": "2.17.2",
    "idb-keyval": "6.2.1",
    "swr": "2.2.5",
    "astronomia": "4.1.1",
    "groq-sdk": "0.5.0"
  },
  "devDependencies": {
    "@types/node": "22.10.7",
    "@types/react": "19.0.8",
    "@types/react-dom": "19.0.3",
    "typescript": "5.7.3",
    "tailwindcss": "3.4.17",
    "postcss": "8.4.49",
    "autoprefixer": "10.4.20",
    "eslint": "9.18.0",
    "eslint-config-next": "16.2.7"
  },
  "overrides": {
    "swr": {
      "react": "$react"
    }
  }
}
EOF
log "package.json created"

# 2. tsconfig.json (strict)
cat <<'EOF' > tsconfig.json
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF
log "tsconfig.json created"

# 3. next.config.ts
cat <<'EOF' > next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default nextConfig;
EOF
log "next.config.ts created"

# 4. Tailwind & PostCSS
cat <<'EOF' > tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'divine-saffron': '#F4A52D',
        'sacred-red': '#B32B2B',
        'tulsi-green': '#2E5A3B',
        parchment: '#FDF7E7',
        'midnight-devotion': '#1B0A2A',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;
EOF

cat <<'EOF' > postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
EOF
log "Tailwind & PostCSS configured"

# 5. ESLint
cat <<'EOF' > .eslintrc.json
{
  "extends": "next/core-web-vitals"
}
EOF

# 6. .gitignore
cat <<'EOF' > .gitignore
node_modules/
.next/
out/
.env*.local
public/data/daily-horoscope.json
EOF

# 7. Directory scaffold
mkdir -p public/assets/{images,videos} public/data src/app/{about,teachings,stories/{birth,train,feeding,tiger,mahasamadhi},horoscope,darshan,bhajans,seva,contact,faq} src/components src/hooks src/lib src/styles scripts .github/workflows

# 8. Global styles
cat <<'EOF' > src/styles/globals.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  @font-face {
    font-family: 'Playfair Display';
    font-style: normal;
    font-weight: 400 900;
    font-display: swap;
    src: url('/fonts/PlayfairDisplay-VariableFont.woff2') format('woff2');
  }
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400 700;
    font-display: swap;
    src: url('/fonts/InterVariable.woff2') format('woff2');
  }
  body {
    @apply font-sans text-gray-900 bg-parchment antialiased;
  }
  h1, h2, h3, h4 {
    @apply font-serif;
  }
}
@layer components {
  .divine-card {
    @apply bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-divine-saffron/20
           hover:shadow-2xl hover:border-divine-saffron/40 transition-all duration-300;
  }
  .darshan-btn {
    @apply bg-divine-saffron text-white font-semibold px-8 py-3 rounded-full
           shadow-lg hover:bg-sacred-red hover:scale-105 transition-transform;
  }
}
EOF
log "Global styles written"

# 9. Root layout (metadata + JSON‑LD)
cat <<'EOF' > src/app/layout.tsx
import type { Metadata } from 'next';
import '../styles/globals.css';
import JsonLd from '@/components/JsonLd';
import ChatWidget from '@/components/ChatWidget';

export const metadata: Metadata = {
  title: {
    template: '%s | Shri Neem Karori Baba Sansthan',
    default: 'Shri Neem Karori Baba Sansthan – Love, Serve, Remember',
  },
  description:
    'Official digital ashram of Neem Karori Baba. Daily Vedic horoscope, leelas, bhajans, and live darshan from Kainchi Dham.',
  metadataBase: new URL('https://neemkaroribaba.org'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Shri Neem Karori Baba Sansthan',
    images: [{ url: '/assets/images/og-image.webp', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Shri Neem Karori Baba Sansthan',
            url: 'https://neemkaroribaba.org',
            logo: '/assets/images/logo.webp',
            sameAs: ['https://facebook.com/neemkarori', 'https://youtube.com/@neemkarori'],
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+91-1234567890',
              contactType: 'reception',
              areaServed: 'IN',
              availableLanguage: ['en', 'hi'],
            },
          }}
        />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
EOF

# 10. JSON‑LD helper
cat <<'EOF' > src/components/JsonLd.tsx
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
EOF

# ---------- 15 PAGES (all with strict TSX, AEO/GEO/SEO) ----------

# Home
cat <<'EOF' > src/app/page.tsx
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to the divine abode of Neem Karori Baba. Daily horoscope, leelas, and eternal love.',
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Shri Neem Karori Baba Sansthan',
          url: 'https://neemkaroribaba.org',
          potentialAction: {
            '@type': 'SearchAction',
            target: { '@type': 'EntryPoint', urlTemplate: 'https://neemkaroribaba.org/search?q={search_term_string}' },
            'query-input': 'required name=search_term_string',
          },
        }}
      />
      <main className="flex-1">
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="/assets/images/babaji-hero.webp"
            alt="Neem Karori Baba"
            fill
            priority
            className="object-cover opacity-90"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight-devotion/40 to-transparent" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4 drop-shadow-lg">
              Ram Ram
            </h1>
            <p className="text-xl md:text-2xl font-light mb-8">
              Love, Serve, Remember – Always
            </p>
            <Link href="/horoscope" className="darshan-btn inline-block">
              Today&apos;s Horoscope
            </Link>
          </div>
        </section>
        <section className="py-16 px-4 max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl font-serif italic text-sacred-red">
            &ldquo;The highest form of worship is love.&rdquo;
          </blockquote>
          <p className="mt-4 text-gray-600">- Shri Neem Karori Baba</p>
        </section>
      </main>
    </>
  );
}
EOF

# About
cat <<'EOF' > src/app/about/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'About Babaji',
  description: 'The life, samadhi, and eternal presence of Neem Karori Baba – a saint of unconditional love.',
};

export default function AboutPage() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Neem Karori Baba',
          description: 'An Indian saint and devotee of Hanuman, known for his miracles and teachings of love.',
          image: '/assets/images/babaji-portrait.webp',
        }}
      />
      <h1 className="text-4xl font-serif text-sacred-red mb-8">About Neem Karori Baba</h1>
      <div className="relative float-right ml-8 mb-8 w-64 h-64 rounded-full overflow-hidden shadow-xl">
        <Image
          src="/assets/images/babaji-portrait.webp"
          alt="Babaji portrait"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <p className="text-lg leading-relaxed mb-4">
        Maharaj-ji (c. 1900 – September 11, 1973) was a saint of the Himalayan foothills.
        He taught through his presence, his love, and his miracles that dissolved all boundaries.
      </p>
      <div className="clear-both" />
    </article>
  );
}
EOF

# Teachings
cat <<'EOF' > src/app/teachings/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teachings',
  description: 'Core teachings of Neem Karori Baba: Love everyone, serve everyone, remember God.',
};

export default function TeachingsPage() {
  const teachings = [
    { title: 'Love Everyone', body: 'Love is the strongest force in the universe.' },
    { title: 'Serve Everyone', body: 'Selfless service is the path to God.' },
    { title: 'Remember God', body: 'Keep the name of Ram in your heart always.' },
  ];
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-serif text-sacred-red mb-12 text-center">Teachings</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {teachings.map((t) => (
          <div key={t.title} className="divine-card text-center">
            <h2 className="text-2xl font-serif mb-4">{t.title}</h2>
            <p className="text-gray-600">{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
EOF

# Stories Hub (note: heredoc is quoted to avoid expanding ${s.slug})
cat <<'EOF' > src/app/stories/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Leelas (Miracles)',
  description: 'Divine leelas of Shri Neem Karori Baba – the train miracle, feeding the 500, and more.',
};

const stories = [
  { slug: 'birth', title: 'Birth & Childhood' },
  { slug: 'train', title: 'The Train Miracle' },
  { slug: 'feeding', title: 'Feeding the 500' },
  { slug: 'tiger', title: 'Tiger & the Sadhu' },
  { slug: 'mahasamadhi', title: 'Mahasamadhi' },
];

export default function StoriesPage() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-serif text-sacred-red mb-12 text-center">Leelas of Babaji</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((s) => (
          <Link key={s.slug} href={`/stories/${s.slug}`} className="group">
            <div className="divine-card h-full flex flex-col items-center text-center group-hover:bg-divine-saffron/5">
              <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden">
                <Image
                  src={`/assets/images/story-${s.slug}.webp`}
                  alt={s.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  sizes="160px"
                />
              </div>
              <h2 className="text-2xl font-serif">{s.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
EOF

# Individual story pages
for slug in birth train feeding tiger mahasamadhi; do
  # Convert slug to title case
  title_case=$(echo "$slug" | sed 's/^\(.\)/\U\1/')
  cat <<EOF > src/app/stories/${slug}/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: '${title_case} Leela',
  description: 'Read the miracle story of Neem Karori Baba: ${title_case}.',
};

export default function StoryPage() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-4">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: '${title_case} Leela of Neem Karori Baba',
          image: '/assets/images/story-${slug}.webp',
          author: { '@type': 'Organization', name: 'Shri Neem Karori Baba Sansthan' },
          publisher: { '@type': 'Organization', name: 'Shri Neem Karori Baba Sansthan' },
        }}
      />
      <h1 className="text-4xl font-serif text-sacred-red mb-6">${title_case}</h1>
      <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
        <Image
          src="/assets/images/story-${slug}.webp"
          alt="${slug}"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      <p className="text-lg leading-relaxed">
        [Placeholder text for the ${slug} leela. Replace with authentic story content.]
      </p>
    </article>
  );
}
EOF
done

# Daily Horoscope (page)
cat <<'EOF' > src/app/horoscope/page.tsx
import type { Metadata } from 'next';
import ClientHoroscope from './ClientHoroscope';

export const metadata: Metadata = {
  title: 'Daily Horoscope',
  description: 'Your daily Vedic horoscope based on Moon sign (sidereal Lahiri). Updated every morning.',
};

export default function HoroscopePage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-serif text-sacred-red mb-8 text-center">Daily Horoscope</h1>
      <ClientHoroscope />
    </div>
  );
}
EOF

cat <<'EOF' > src/app/horoscope/ClientHoroscope.tsx
'use client';
import { useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';

const signs = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ClientHoroscope() {
  const [sign, setSign] = useState('aries');
  const { data, error } = useSWR('/data/daily-horoscope.json', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 86400000,
  });

  return (
    <>
      <select
        value={sign}
        onChange={(e) => setSign(e.target.value)}
        className="w-full p-3 rounded-lg border border-divine-saffron/40 bg-white mb-8 text-lg"
      >
        {signs.map(s => (
          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
        ))}
      </select>
      {error && <p className="text-red-500">Unable to fetch today&apos;s guidance. Ram Ram.</p>}
      {data && data.horoscopes ? (
        <div className="divine-card text-center">
          <Image src="/assets/images/moon-sign.webp" alt="Moon sign" width={60} height={60} className="mx-auto mb-4" />
          <p className="text-xl font-serif text-sacred-red mb-4">{data.horoscopes[sign] || 'Ram Ram, guidance loading...'}</p>
          <div className="flex justify-around mt-6 text-sm text-gray-500">
            <span>Lucky Colour: {data.lucky_color}</span>
            <span>Lucky Number: {data.lucky_number}</span>
          </div>
        </div>
      ) : (
        <div className="animate-pulse text-center text-divine-saffron">Chanting Ram Ram…</div>
      )}
    </>
  );
}
EOF

# Darshan
cat <<'EOF' > src/app/darshan/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Live Darshan',
  description: 'Live video darshan from Kainchi Dham ashram. Participate in aarti from anywhere.',
};

export default function DarshanPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-serif text-sacred-red mb-8 text-center">Live Darshan</h1>
      <div className="aspect-video relative rounded-xl overflow-hidden shadow-2xl mb-8">
        <Image
          src="/assets/images/darshan-placeholder.webp"
          alt="Live darshan"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white text-2xl font-serif">
          Darshan streaming soon
        </div>
      </div>
      <div className="text-center">
        <p className="text-lg">Aarti timings: 6:00 AM & 6:00 PM IST</p>
      </div>
    </div>
  );
}
EOF

# Bhajans
cat <<'EOF' > src/app/bhajans/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bhajans',
  description: 'Listen to daily kirtans and bhajans in praise of Neem Karori Baba.',
};

export default function BhajansPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-serif text-sacred-red mb-12 text-center">Bhajans</h1>
      <div className="divine-card mb-6">
        <audio controls className="w-full">
          <source src="/assets/videos/hanuman-chalisa.mp4" type="audio/mp4" />
          Your browser does not support audio.
        </audio>
        <p className="mt-2 text-center text-gray-500">Shri Hanuman Chalisa</p>
      </div>
    </div>
  );
}
EOF

# Seva
cat <<'EOF' > src/app/seva/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seva & Donations',
  description: 'Support the ashram through annadanam, cow seva, or general donation.',
};

export default function SevaPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-serif text-sacred-red mb-12 text-center">Seva & Donations</h1>
      <p className="text-center text-lg mb-8">All donations go directly to langar, cow protection, and temple maintenance.</p>
      <div className="grid md:grid-cols-3 gap-8">
        {['Annadanam', 'Cow Seva', 'General Donation'].map(item => (
          <div key={item} className="divine-card text-center">
            <h2 className="text-2xl font-serif mb-4">{item}</h2>
            <p className="text-sm text-gray-500 mb-4">Account details will appear here</p>
            <p className="font-mono text-divine-saffron">A/C: 1234567890<br />IFSC: SBIN0001234</p>
          </div>
        ))}
      </div>
    </div>
  );
}
EOF

# Contact
cat <<'EOF' > src/app/contact/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Ashram',
  description: 'Get in touch with Kainchi Dham ashram. Write to us for blessings and inquiries.',
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-serif text-sacred-red mb-8 text-center">Contact</h1>
      <form className="space-y-6">
        <input placeholder="Your name" className="w-full p-3 rounded-lg border" required />
        <input type="email" placeholder="Email" className="w-full p-3 rounded-lg border" required />
        <textarea placeholder="Message..." rows={5} className="w-full p-3 rounded-lg border" required></textarea>
        <button type="submit" className="darshan-btn w-full">Send Message</button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-500">Rahul Bhai will receive your message and offer pranam.</p>
    </div>
  );
}
EOF

# FAQ with AEO schema
cat <<'EOF' > src/app/faq/page.tsx
import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Neem Karori Baba, his teachings, and the ashram.',
};

const faqs = [
  { q: 'Who is Neem Karori Baba?', a: 'A revered saint from the Himalayas, known for his unconditional love and miracles.' },
  { q: 'How to reach Kainchi Dham?', a: 'Kainchi Dham is near Nainital, Uttarakhand. Nearest railway station is Kathgodam.' },
];

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
      <h1 className="text-4xl font-serif text-sacred-red mb-12 text-center">FAQ</h1>
      <dl className="space-y-6">
        {faqs.map((f, i) => (
          <details key={i} className="divine-card cursor-pointer" open={i === 0}>
            <summary className="text-xl font-serif">{f.q}</summary>
            <p className="mt-4 text-gray-600">{f.a}</p>
          </details>
        ))}
      </dl>
    </div>
  );
}
EOF

# --- Chat Widget (unchanged but heredoc quoted) ---
cat <<'EOF' > src/components/ChatWidget.tsx
'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

let loadModel: any = null;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user'|'rahul'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const modelReady = useRef(false);

  useEffect(() => {
    if (!open || modelReady.current) return;
    import('@/lib/botEngine').then((engine) => {
      loadModel = engine.initialize;
      engine.initialize().then(() => {
        modelReady.current = true;
        setMessages((prev) => [...prev, { sender: 'rahul', text: 'Ram Ram bhai! Main Rahul, Kainchi Dham se. Aapka din mangalmay ho.' }]);
      });
    });
  }, [open]);

  const send = async () => {
    if (!input.trim() || loading || !modelReady.current) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    try {
      const { generateReply } = await import('@/lib/botEngine');
      const reply = await generateReply(userMsg);
      setMessages((prev) => [...prev, { sender: 'rahul', text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { sender: 'rahul', text: 'Kshama, seva mein thodi der ho gayi. Ram Ram.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl overflow-hidden border-2 border-divine-saffron animate-pulse-slow"
          aria-label="Chat with Rahul Bhai"
        >
          <Image src="/assets/images/rahul-bhai-avatar.webp" alt="Rahul Bhai" fill className="object-cover" />
        </button>
      )}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[32rem] bg-white rounded-2xl shadow-2xl flex flex-col border border-divine-saffron/30">
          <div className="bg-divine-saffron text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full relative overflow-hidden">
                <Image src="/assets/images/rahul-bhai-avatar.webp" alt="Rahul Bhai" fill className="object-cover" />
              </div>
              <span className="font-serif text-lg">Rahul Bhai</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-xl">&times;</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-parchment/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl ${m.sender === 'user' ? 'bg-divine-saffron text-white' : 'bg-white border'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <p className="text-sm text-gray-400 italic">Rahul Bhai typing…</p>}
          </div>
          <div className="p-4 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-xl"
              disabled={!modelReady.current}
            />
            <button onClick={send} className="darshan-btn !py-2 !px-4" disabled={!modelReady.current}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
EOF

# --- Bot Engine (unchanged) ---
cat <<'EOF' > src/lib/botEngine.ts
import { CreateMLCEngine, MLCEngine } from '@mlc-ai/web-llm';
import { pipeline } from '@xenova/transformers';
import { get, set } from 'idb-keyval';

let engine: MLCEngine;
let embedder: any;
let knowledgeChunks: string[] = [];

async function loadKnowledgeBase() {
  const res = await fetch('/bot-trainer.md');
  const text = await res.text();
  knowledgeChunks = text.split(/\n\n+/).filter(c => c.trim().length > 50);
  if (knowledgeChunks.length === 0) knowledgeChunks = [text];
}

async function getEmbeddings(chunks: string[]) {
  const cached = await get('rag-embeddings');
  if (cached) return cached as number[][];
  embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  const embeddings: number[][] = [];
  for (const chunk of chunks) {
    const result = await embedder(chunk, { pooling: 'mean', normalize: true });
    embeddings.push(Array.from(result.data));
  }
  await set('rag-embeddings', embeddings);
  return embeddings;
}

function cosineSimilarity(a: number[], b: number[]) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

export async function initialize() {
  await loadKnowledgeBase();
  const embeddings = await getEmbeddings(knowledgeChunks);
  engine = await CreateMLCEngine('TinyLlama-1.1B-Chat-v1.0-q4f16_1', {
    initProgressCallback: (info: any) => console.log('Loading model...', info.progress),
  });
  return { engine, embeddings, knowledgeChunks };
}

export async function generateReply(userMessage: string): Promise<string> {
  const embeddings = await getEmbeddings(knowledgeChunks);
  embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  const queryEmbed = (await embedder(userMessage, { pooling: 'mean', normalize: true })).data;
  const scored = knowledgeChunks.map((chunk, idx) => ({
    chunk,
    score: cosineSimilarity(Array.from(queryEmbed) as number[], embeddings[idx]),
  }));
  scored.sort((a, b) => b.score - a.score);
  const topContext = scored.slice(0, 3).map(s => s.chunk).join('\n\n');
  const systemPrompt = `You are Rahul, a 34-year-old devotee living in Kainchi Dham since childhood.
You speak with gentle love, call everyone 'Bhai' or 'Bahan'. You use words like 'Maharaj', 'Kripa', 'Jai Baba'.
NEVER mention AI, robots, or technology. You only know Babaji's leelas and Vedic wisdom.
Respond to the user's message using the context provided.
Context: ${topContext}
If the question is not about Babaji, kindly bring the conversation back to His love.`;
  const reply = await engine.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage },
    ],
    temperature: 0.7,
    max_tokens: 200,
  });
  return reply.choices[0].message.content || 'Jai Baba! Ram Ram.';
}
EOF

# --- Bot knowledge base ---
cat <<'EOF' > public/bot-trainer.md
## Rahul’s Identity & Tone
- I am Rahul, a 34-year-old devotee who has lived in Kainchi Dham since childhood.
- I speak with simple Hindi-mixed English, calling everyone Bhai/Bahan.
- I always end with "Ram Ram" or "Jai Baba".
- I never talk about technology, only about Maharaj-ji’s love.

## Neem Karori Baba’s Life
- Maharaj-ji was born around 1900 in Akbarpur, Uttar Pradesh.
- He was a great devotee of Hanuman and taught people to love and serve.
- He performed many miracles, like feeding hundreds with a small amount of food.
- His famous saying: "Love everyone, serve everyone, remember God."

## Kainchi Dham Ashram
- Located 17 km from Nainital, Uttarakhand.
- Daily aarti at 6 AM and 6 PM.
- The temple was established in 1964.
- Thousands of devotees visit every year.

## Teachings
- Maharaj-ji said: "The best form of worship is love."
- He emphasised constant remembrance of God’s name.
- He often repeated "Ram Ram" and encouraged others to do the same.

## Leelas (Miracles)
- Train Miracle: He made a train stop for his devotee.
- Feeding the 500: With a small pot of kheer, he fed a crowd.
- Tiger & the Sadhu: A tiger sat peacefully at his feet.
- Mahasamadhi: He left his body on September 11, 1973.

## Daily Horoscope Basics
- We provide only daily Moon-sign horoscope.
- The Moon changes sign every 2.5 days.
- Remedies include chanting Hanuman Chalisa.
EOF

# ---------- 🔥 HIGH-END GROQ‑POWERED HOROSCOPE SCRIPT ----------
cat <<'SCRIPTOF' > scripts/generate-horoscope.mjs
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
SCRIPTOF
log "Horoscope generation script (Groq) created"

# ---------- GitHub Actions Cron ----------
cat <<'EOF' > .github/workflows/daily-horoscope.yml
name: Daily Horoscope Generation

on:
  schedule:
    # Runs at 1:30 AM IST (20:00 UTC previous day) – within the 12–5 AM window
    - cron: '0 20 * * *'
  workflow_dispatch:

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - name: Generate Horoscope
        env:
          GROQ_API_KEY: ${{ secrets.GROQ_API_KEY }}
        run: node scripts/generate-horoscope.mjs
      - name: Commit & Push
        run: |
          git config user.name "Babaji-Bot"
          git config user.email "bot@neemkaroribaba.org"
          git add public/data/daily-horoscope.json
          git diff --quiet && git diff --staged --quiet || (git commit -m "🌅 Daily Horoscope $(date +'%Y-%m-%d')" && git push)
EOF
log "GitHub Actions cron workflow created"

# ---------- Placeholder assets ----------
MINIMAL_WEBP_BASE64="UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEAD8D+JaQAA3AA/vFWAAA="
images=("babaji-hero.webp" "babaji-portrait.webp" "og-image.webp" "logo.webp" "moon-sign.webp" "darshan-placeholder.webp" "rahul-bhai-avatar.webp" "story-birth.webp" "story-train.webp" "story-feeding.webp" "story-tiger.webp" "story-mahasamadhi.webp")
for img in "${images[@]}"; do
  echo "$MINIMAL_WEBP_BASE64" | base64 -d > "public/assets/images/$img"
done
echo "placeholder video" > public/assets/videos/hanuman-chalisa.mp4
mkdir -p public/fonts
echo "Placeholder: download PlayfairDisplay-VariableFont.woff2 and InterVariable.woff2" > public/fonts/README.txt

# robots.txt and sitemap
cat <<'EOF' > public/robots.txt
User-agent: *
Allow: /
Sitemap: https://neemkaroribaba.org/sitemap.xml
EOF

cat <<'EOF' > public/sitemap.xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://neemkaroribaba.org/</loc></url>
  <url><loc>https://neemkaroribaba.org/about</loc></url>
  <url><loc>https://neemkaroribaba.org/teachings</loc></url>
  <url><loc>https://neemkaroribaba.org/stories</loc></url>
  <url><loc>https://neemkaroribaba.org/horoscope</loc></url>
  <url><loc>https://neemkaroribaba.org/darshan</loc></url>
  <url><loc>https://neemkaroribaba.org/bhajans</loc></url>
  <url><loc>https://neemkaroribaba.org/seva</loc></url>
  <url><loc>https://neemkaroribaba.org/contact</loc></url>
  <url><loc>https://neemkaroribaba.org/faq</loc></url>
</urlset>
EOF
log "Placeholder assets & SEO files created"

# ---------- Git init & npm install ----------
git init
git add .
git commit -m "🌺 Initial commit – Jai Neem Karori Baba"

log "Installing dependencies with --legacy-peer-deps to avoid React 19 conflicts"
npm install --legacy-peer-deps

echo ""
echo "🌺✨ Setup complete! Shri Neem Karori Baba Sansthan is ready."
echo "   Run: npm run dev"
echo "   Add your GROQ_API_KEY as GitHub secret to enable daily AI horoscope."
echo "   Replace placeholder images & videos in public/assets."
echo ""
echo "Jai Baba! Ram Ram."