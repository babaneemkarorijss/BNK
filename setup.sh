#!/usr/bin/env bash
set -Eeuo pipefail
GREEN='\033[0;32m'
NC='\033[0m'
log() { echo -e "${GREEN}✔ $1${NC}"; }

# 1. Remove the separate WhatsAppForm component (optional, we'll inline it)
rm -f src/components/WhatsAppForm.tsx

# 2. Create a strong Contact page with the form inside a clearly marked client component
cat <<'CONTACTFIX' > src/app/contact/page.tsx
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
CONTACTFIX
log "Contact page updated with ClientContactForm import"

# 3. Create the ClientContactForm component in the contact directory
mkdir -p src/app/contact

cat <<'CLIENTFORM' > src/app/contact/ClientContactForm.tsx
'use client';

export default function ClientContactForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;
        const whatsappMessage = encodeURIComponent(
          `Namaste! 🙏\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\n- Sent via B.N.K. Jyotish Seva`
        );
        window.open(`https://wa.me/916390395151?text=${whatsappMessage}`, '_blank');
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Your Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-divine-saffron focus:border-transparent outline-none"
          placeholder="Enter your full name"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-divine-saffron focus:border-transparent outline-none"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Your Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-divine-saffron focus:border-transparent outline-none resize-none"
          placeholder="How can we help you?"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white font-semibold py-3 rounded-full hover:bg-green-700 transition flex items-center justify-center gap-2"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Chat on WhatsApp
      </button>
    </form>
  );
}
CLIENTFORM
log "ClientContactForm component created inside contact directory"

# 4. Thoroughly clean the build cache
rm -rf .next
rm -rf node_modules/.cache 2>/dev/null || true
log "Build cache completely cleared."

echo ""
echo "✅ Contact page fixed. The form is now inside a properly placed Client Component."
echo "   Restart the dev server with 'npm run dev' – the error will be gone."