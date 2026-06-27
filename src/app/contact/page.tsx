import type { Metadata } from 'next';
import Link from 'next/link';
import ClientContactForm from './ClientContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with B.N.K. Jyotish Seva for astrological consultations and guidance.',
};

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 space-y-16">
      {/* Header */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-sacred-red">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Reach out to Baba Neem Karori Jyotish Seva Sansthan. We are here to serve you with divine wisdom and
          astrological guidance.
        </p>
      </section>

      {/* Address & Phone */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="divine-card text-center space-y-4">
          <div className="text-divine-saffron text-3xl">📍</div>
          <h2 className="text-2xl font-serif text-sacred-red">Registered Office</h2>
          <p className="text-gray-700">
            Plot No. 50, Khasra No. 36,<br />
            Fatte Ka Purwa, Mehaura,<br />
            Chinhat, Lucknow,<br />
            Uttar Pradesh – 226028,<br />
            India
          </p>
        </div>

        <div className="divine-card text-center space-y-4">
          <div className="text-divine-saffron text-3xl">📞</div>
          <h2 className="text-2xl font-serif text-sacred-red">Call Us</h2>
          <a
            href="tel:+916390395151"
            className="text-2xl font-semibold text-sacred-red hover:text-divine-saffron transition"
          >
            +91 6390395151
          </a>
          <p className="text-gray-500 text-sm mt-2">For astrological consultations and general inquiries.</p>
        </div>
      </div>

      {/* WhatsApp Form – now inside a Client Component */}
      <div className="divine-card max-w-xl mx-auto space-y-6">
        <h2 className="text-2xl font-serif text-sacred-red text-center">Send us a Message on WhatsApp</h2>
        <ClientContactForm />
      </div>

      {/* Sansthan Info */}
      <div className="divine-card text-center space-y-4">
        <h2 className="text-2xl font-serif text-sacred-red">Baba Neem Karori Jyotish Seva Sansthan</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          A registered public charitable trust (established 27 November 2024) dedicated to spreading the teachings of
          Shri Neem Karori Baba through Vedic astrology, spiritual counselling, and selfless service.
        </p>
        <p className="text-gray-500 text-sm">
          Registration: Book No. 4, Serial No. 479, Pages 111‑152 | Application No: 202400821087842
        </p>
      </div>

      <div className="text-center">
        <Link href="/" className="darshan-btn">Back to Home</Link>
      </div>
    </main>
  );
}
