import type { Metadata } from 'next';
import Image from 'next/image';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'About Babaji',
  description: 'The life, samadhi, and eternal presence of Neem Karori Baba – a saint of unconditional love.',
};

export default function AboutPage() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Neem Karori Baba',
          description: 'An Indian saint and devotee of Hanuman, known for his miracles and teachings of love.',
          image: '/assets/images/babaji-portrait.webp',
        }}
      />
      <h1 className="text-4xl font-serif text-sacred-red mb-8">About Neem Karori Baba</h1>
      <div className="relative float-right ml-8 mb-8 w-64 h-64 rounded-full overflow-hidden shadow-xl">
        <Image
          src="/assets/images/babaji-portrait.webp"
          alt="Babaji portrait"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <p className="text-lg leading-relaxed mb-4">
        Maharaj-ji (c. 1900 – September 11, 1973) was a saint of the Himalayan foothills.
        He taught through his presence, his love, and his miracles that dissolved all boundaries.
      </p>
      <div className="clear-both" />
    </article>
  );
}
