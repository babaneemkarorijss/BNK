import type { Metadata } from 'next';
import '../styles/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';

export const metadata: Metadata = {
  title: {
    template: '%s | Shri Neem Karori Baba Sansthan',
    default: 'Shri Neem Karori Baba Sansthan – Love, Serve, Remember',
  },
  description: 'Official digital ashram of Neem Karori Baba. Daily Vedic horoscope, leelas, bhajans, and live darshan from Kainchi Dham.',
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
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
