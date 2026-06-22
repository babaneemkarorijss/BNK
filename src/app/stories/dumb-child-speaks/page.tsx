import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Dumb Child Speaks – Leela',
  description: '<p>Baba told Shyam Sunder to go to the garden... [full story]</p>...',
};

export default function LeelaPage() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4 space-y-12 animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-serif text-sacred-red text-center">The Dumb Child Speaks</h1>
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
        <Image src="/assets/images/leela-dumb-child-speaks.webp" alt="The Dumb Child Speaks" fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
      </div>
      <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
        <p>Baba told Shyam Sunder to go to the garden... [full story]</p>
      </div>
      <div className="text-center">
        <Link href="/stories" className="darshan-btn">Back to Leelas</Link>
      </div>
    </article>
  );
}
