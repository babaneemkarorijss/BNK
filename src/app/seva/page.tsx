'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SevaPage() {
  return (
    <main className="max-w-4xl mx-auto py-16 px-4 space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-serif text-sacred-red">Seva &amp; Donations</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your generous contribution supports our mission to spread the teachings of Neem Karori Baba
          through Vedic astrology, spiritual counselling, and selfless service to the underprivileged.
        </p>
      </section>

      {/* QR Scanner + Form Grid */}
      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* QR / Scanner Section */}
        <div className="divine-card text-center space-y-6">
          <h2 className="text-2xl font-serif text-sacred-red">Scan to Donate</h2>
          <div className="relative w-64 h-64 mx-auto rounded-2xl overflow-hidden shadow-xl border-4 border-divine-saffron/30">
            <Image
              src="/assets/images/seva-qr.webp"
              alt="Donation QR Code"
              fill
              className="object-contain p-4"
              sizes="256px"
            />
          </div>
          <p className="text-sm text-gray-500">
            Scan this QR code with any UPI app (Google Pay, PhonePe, Paytm) to make your donation.
          </p>
          <div className="bg-sacred-red/5 rounded-xl p-4 text-left text-sm text-gray-700 space-y-1">
            <p><strong>UPI ID:</strong> bnkjss@upi</p>
            <p><strong>Account:</strong> 1234567890</p>
            <p><strong>IFSC:</strong> SBIN0001234</p>
          </div>
        </div>

        {/* Donation Form */}
        <div className="divine-card space-y-6">
          <h2 className="text-2xl font-serif text-sacred-red text-center">Donation Details</h2>
          <p className="text-sm text-gray-500 text-center">
            After making your donation, please fill this form so we can acknowledge your contribution.
          </p>
          <DonationForm />
        </div>
      </div>

      {/* Impact Section */}
      <section className="divine-card text-center space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">Where Your Seva Goes</h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {[
            { title: 'Annadanam', desc: 'Providing free meals to devotees and the needy at our ashram.' },
            { title: 'Vedic Education', desc: 'Preserving ancient scriptures and offering free astrology courses.' },
            { title: 'Cow Protection', desc: 'Caring for Gau Mata and maintaining a healthy gaushala.' },
          ].map(item => (
            <div key={item.title} className="bg-white/50 rounded-xl p-4">
              <h3 className="font-serif text-lg text-sacred-red mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Home */}
      <div className="text-center">
        <Link href="/" className="darshan-btn">Back to Home</Link>
      </div>
    </main>
  );
}

function DonationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', '70af0353-c737-4333-a0b4-15eefa1ae2f7');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        form.reset();
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="text-5xl">🙏</div>
        <h3 className="text-2xl font-serif text-sacred-red">Dhanyavad! (Thank You)</h3>
        <p className="text-gray-600">
          Your donation details have been received. May Babaji&apos;s blessings be with you always.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="subject" value="New Seva Donation - BNK JSS" />
      <input type="hidden" name="from_name" value="B.N.K. Jyotish Seva Sansthan" />
      <input type="hidden" name="redirect" value="https://www.babaneemkarori.com/seva" />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
        <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-divine-saffron focus:border-transparent outline-none" placeholder="Enter your full name" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
        <input type="email" id="email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-divine-saffron focus:border-transparent outline-none" placeholder="your@email.com" />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-divine-saffron focus:border-transparent outline-none" placeholder="+91 9876543210" />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Donation Amount (₹) *</label>
        <input type="number" id="amount" name="amount" required min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-divine-saffron focus:border-transparent outline-none" placeholder="100" />
      </div>

      <div>
        <label htmlFor="urn" className="block text-sm font-medium text-gray-700 mb-1">Payment URN / Transaction ID *</label>
        <input type="text" id="urn" name="urn" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-divine-saffron focus:border-transparent outline-none" placeholder="UPI transaction ID or bank reference number" />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
        <textarea id="message" name="message" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-divine-saffron focus:border-transparent outline-none resize-none" placeholder="Any special prayer request..."></textarea>
      </div>

      <button type="submit" disabled={loading} className="w-full darshan-btn disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? 'Submitting…' : 'Submit Donation Details'}
      </button>
    </form>
  );
}
