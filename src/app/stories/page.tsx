import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Leelas (Miracles)',
  description: 'Divine leelas of Shri Neem Karori Baba – the train miracle, feeding the 500, and more.',
};

const stories = [
  { slug: 'birth', title: 'Birth & Childhood' },
  { slug: 'train', title: 'The Train Miracle' },
  { slug: 'feeding', title: 'Feeding the 500' },
  { slug: 'tiger', title: 'Tiger & the Sadhu' },
  { slug: 'mahasamadhi', title: 'Mahasamadhi' },
];

export default function StoriesPage() {
  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-serif text-sacred-red mb-12 text-center">Leelas of Babaji</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((s) => (
          <Link key={s.slug} href={`/stories/${s.slug}`} className="group">
            <div className="divine-card h-full flex flex-col items-center text-center group-hover:bg-divine-saffron/5">
              <div className="relative w-40 h-40 mb-4 rounded-full overflow-hidden">
                <Image
                  src={`/assets/images/story-${s.slug}.webp`}
                  alt={s.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                  sizes="160px"
                />
              </div>
              <h2 className="text-2xl font-serif">{s.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
