import type { Metadata } from 'next';
import Image from 'next/image';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Feeding Leela',
  description: 'Read the miracle story of Neem Karori Baba: Feeding.',
};

export default function StoryPage() {
  return (
    <article className="max-w-3xl mx-auto py-16 px-4">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'Feeding Leela of Neem Karori Baba',
          image: '/assets/images/story-feeding.webp',
          author: { '@type': 'Organization', name: 'Shri Neem Karori Baba Sansthan' },
          publisher: { '@type': 'Organization', name: 'Shri Neem Karori Baba Sansthan' },
        }}
      />
      <h1 className="text-4xl font-serif text-sacred-red mb-6">Feeding</h1>
      <div className="relative w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden">
        <Image
          src="/assets/images/story-feeding.webp"
          alt="feeding"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      <p className="text-lg leading-relaxed">
        [Placeholder text for the feeding leela. Replace with authentic story content.]
      </p>
    </article>
  );
}
