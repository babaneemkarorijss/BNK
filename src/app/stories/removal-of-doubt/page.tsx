import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Removal of Doubt – Leela',
  description: '<p>In May 1944, Ravi Prakash Pande (Rajida) refused to visit a saint... [full story from earlier]</p...',
};

export default function LeelaPage() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4 space-y-12 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-serif text-sacred-red text-center">Removal of Doubt</h1>
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
        <Image src="/assets/images/leela-removal-of-doubt.webp" alt="Removal of Doubt" fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
      </div>
      <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
        <p>In May 1944, Ravi Prakash Pande (Rajida) refused to visit a saint... [full story from earlier]</p><p>Eight years later, Baba hummed “Ramahi keval prem piyara”.</p>
      </div>
      <div className="text-center">
        <Link href="/stories" className="darshan-btn">Back to Leelas</Link>
      </div>
    </article>
  );
}
