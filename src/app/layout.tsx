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
