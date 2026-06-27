import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Dumb Child Speaks – Leela',
  description: 'How Baba healed a mute boy without being physically present.',
};

export default function LeelaPage() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4 space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-sacred-red">The Dumb Child Speaks</h1>
        <p className="text-lg text-gray-500 italic">
          &ldquo;You say anything you like, his son will be cured.&rdquo;
        </p>
      </div>

      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/assets/images/leela-dumb-child.webp"
          alt="A mute boy speaks for the first time"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">A Father&rsquo;s Desperation</h2>
          <p>
            Baba was staying at his family residence, Dak Bangalia, in his native village of Akbarpur. One
            afternoon, while his relative Shyam Sunder Sharma was with him, Baba suddenly turned and gave a
            strange, precise command: &ldquo;You go into the garden. Someone will come looking for Baba Neeb
            Karori. His son, who is dumb, will be with him. Tell him that there is no baba here. You say anything
            you like, his son will be cured.&rdquo;
          </p>
          <p>
            Shyam Sunder was puzzled, but he obeyed immediately. He walked out into the garden and waited, unsure
            of what was about to unfold. Within moments, a car pulled up. Dr. Beg of Firozabad stepped out,
            accompanied by his young son. The boy had been mute since birth, and the desperate father had taken
            him to various specialists, but no treatment had worked. Someone had advised him to seek the blessing
            of Baba Neeb Karori and had given him this address.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Miracle Unfolds</h2>
          <p>
            Dr. Beg asked anxiously, &ldquo;Where can I find Baba Neeb Karori?&rdquo; Shyam Sunder, holding
            firmly to Baba&rsquo;s instruction, replied that there was no Baba there. But then, on a sudden
            impulse, he looked at the boy and asked, &ldquo;What is your name?&rdquo;
          </p>
          <p>
            The impossible happened. The child, who had never spoken a single word in his life, opened his mouth
            and clearly answered. Dr. Beg stood frozen in shock, unable to believe his ears. His son was speaking
            &mdash; for the very first time. Shyam Sunder calmly explained that Baba&rsquo;s grace had healed the
            child and advised the father to speak further with his son, assuring him that the boy would now
            continue to improve.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Silent Master</h2>
          <p>
            The most remarkable aspect of this leela is that Baba never appeared before the doctor or the child.
            He orchestrated the entire miracle from inside the house, using Shyam Sunder as a mere instrument.
            The command he gave was absolute; his words alone were enough to shatter the barriers of nature. The
            boy&rsquo;s speech was restored without a touch, without a ritual, without even a direct glance.
          </p>
          <p>
            Dr. Beg and his son returned home with hearts overflowing with gratitude. The word of this miracle
            spread quickly, and more people came to understand that the saint of Akbarpur was not bound by the
            usual laws of time and space. His will alone was sufficient to rewrite destiny.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">Reflections</h2>
          <p>
            This leela beautifully illustrates that the divine operates through faith. Shyam Sunder did not
            question Baba&rsquo;s cryptic command; he simply followed it. Dr. Beg, though distraught, held onto
            hope and was rewarded beyond measure. Baba&rsquo;s grace flows where there is trust, and it reaches
            even those who have not yet met him. The child&rsquo;s first word was not just a sound &mdash; it was
            a testimony of the power of unwavering belief.
          </p>
        </section>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
        <Link href="/stories" className="darshan-btn">&larr; Back to Leelas</Link>
        <Link href="/stories/removal-of-doubt" className="bg-white text-divine-saffron border border-divine-saffron px-6 py-3 rounded-full font-semibold hover:bg-divine-saffron hover:text-white transition">
          &larr; Previous: Removal of Doubt
        </Link>
        <Link href="/stories/bullets-absorbed" className="darshan-btn">
          Next: Bullets Absorbed &rarr;
        </Link>
      </div>
    </article>
  );
}
