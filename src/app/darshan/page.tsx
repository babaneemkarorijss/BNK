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
