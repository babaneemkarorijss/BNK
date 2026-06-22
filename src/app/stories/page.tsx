import type { Metadata } from 'next';
import Image from 'next/image';
import LeelaCard from '@/components/LeelaCard';

export const metadata: Metadata = {
  title: 'Divine Leelas of Babaji',
  description: 'Explore the miraculous leelas of Shri Neem Karori Baba.',
};

const leelas = [
  { slug: 'removal-of-doubt', title: 'Removal of Doubt', subtitle: 'Baba summons a skeptic' },
  { slug: 'dumb-child-speaks', title: 'The Dumb Child Speaks', subtitle: 'A mute boy&rsquo;s first word' },
  { slug: 'bullets-absorbed', title: 'Bullets Absorbed by the Blanket', subtitle: 'Saving the surgeon&rsquo;s son' },
  { slug: 'change-the-weather', title: 'I Shall Change the Weather', subtitle: 'The June wedding miracle' },
  { slug: 'gift-of-life', title: 'Gift of Life to a Widow&rsquo;s Son', subtitle: 'Snakebite resurrection' },
  { slug: 'birth-of-badrivishal', title: 'Birth of Badrivishal', subtitle: 'A dead newborn resurrected' },
  { slug: 'american-skeptic', title: 'The American Skeptic', subtitle: 'The rolled apple' },
  { slug: 'baba-drove-the-car', title: 'When Baba Drove the Car', subtitle: 'Driver asleep, Baba at the wheel' },
  { slug: 'old-laborer-khantia', title: 'Old Laborer Khantia', subtitle: 'Promise of salvation' },
  { slug: 'mahasamadhi', title: 'The Mahasamadhi Lila', subtitle: 'Final departure &amp; the storm' },
];

export default function StoriesPage() {
  return (
    <main>
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image src="/assets/images/leelas-hero.webp" alt="Divine Leelas" fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight-devotion/60 to-midnight-devotion/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 drop-shadow-lg">Divine Leelas of Babaji</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">Miraculous plays that reveal the boundless love and power of Shri Neem Karori Baba.</p>
        </div>
      </section>
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-8">
          {leelas.map(leela => <LeelaCard key={leela.slug} {...leela} />)}
        </div>
      </section>
    </main>
  );
}
