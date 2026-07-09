import type { Metadata } from 'next';
import Script from 'next/script';
import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | B.N.K. Jyotish Seva',
    default: 'B.N.K. Jyotish Seva – Divine Vedic Astrology',
  },
  description: 'B.N.K. Jyotish Seva offers daily Vedic horoscopes, spiritual teachings of Neem Karori Baba, divine leelas, and astrological consultations. Get accurate predictions and remedies.',
  keywords: ['vedic astrology', 'daily horoscope', 'neem karori baba', 'jyotish', 'astrology', 'horoscope today', 'spiritual guidance', 'remedies', 'kainchi dham'],
  metadataBase: new URL('https://babaneemkarori.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'B.N.K. Jyotish Seva',
    title: 'B.N.K. Jyotish Seva – Divine Vedic Astrology',
    description: 'Daily Vedic horoscopes, teachings of Neem Karori Baba, and spiritual astrological consultations.',
    url: 'https://babaneemkarori.com',
    images: [{ url: '/assets/images/og-image.webp', width: 1200, height: 630, alt: 'B.N.K. Jyotish Seva' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B.N.K. Jyotish Seva',
    description: 'Daily Vedic horoscopes and spiritual guidance.',
    images: ['/assets/images/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-57HSRZBDGN" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-57HSRZBDGN');
        `}} />
        {/* JSON‑LD Structured Data for rich results */}
        <Script id="json-ld-organization" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'B.N.K. Jyotish Seva',
          url: 'https://babaneemkarori.com',
          logo: 'https://babaneemkarori.com/assets/images/logo.webp',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+91-6390395151',
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: ['en', 'hi']
          },
          sameAs: [
            'https://www.instagram.com/bnkjyotishseva',
            'https://www.facebook.com/bnkjyotishseva'
          ]
        }) }} />
        <Script id="json-ld-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'B.N.K. Jyotish Seva',
          url: 'https://babaneemkarori.com',
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://babaneemkarori.com/search?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          }
        }) }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
