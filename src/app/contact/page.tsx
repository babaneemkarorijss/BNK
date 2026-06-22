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
