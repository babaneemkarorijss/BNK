import type { Metadata } from 'next';
import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | B.N.K. Jyotish Seva',
    default: 'B.N.K. Jyotish Seva – Divine Wisdom Through Vedic Astrology',
  },
  description: 'Official digital home of Baba Neem Karori Jyotish Seva Sansthan. Daily Vedic horoscope, leelas, and spiritual service.',
  metadataBase: new URL('https://bnkjyotishseva.org'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'B.N.K. Jyotish Seva',
    images: [{ url: '/assets/images/og-image.webp', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
