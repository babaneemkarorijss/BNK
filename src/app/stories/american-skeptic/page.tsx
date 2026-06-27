import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The American Skeptic – Leela',
  description: 'How Baba answered an atheist&rsquo;s prayer and gave him a miracle.',
};

export default function LeelaPage() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4 space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-sacred-red">The American Skeptic</h1>
        <p className="text-lg text-gray-500 italic">
          &ldquo;You were remembering God?&rdquo;
        </p>
      </div>

      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/assets/images/leela-american.webp"
          alt="The American skeptic and the apple"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Reluctant Visitor</h2>
          <p>
            An American couple came to Kainchi. The wife had met Baba previously and was deeply impressed, but
            the husband was repulsed. He detested seeing Westerners acting &ldquo;crazy&rdquo; and putting
            their heads at Baba&rsquo;s feet, and he was particularly upset with his own wife for doing so.
            For seven days he silently seethed with anger while visiting the ashram, refusing to participate.
            On the eighth day, he decided to skip the visit entirely and sat alone by the lake in Nainital.
          </p>
          <p>
            Though he was an atheist, he found himself praying to God. He asked, &ldquo;What am I doing here?
            Who is this man Maharaj ji?&rdquo; He remembered the phrase, &ldquo;If ye had but faith, ye would
            not need a miracle.&rdquo; Then he prayed aloud: &ldquo;Well I do not have faith, and I need a
            miracle.&rdquo;
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Rolled Apple</h2>
          <p>
            He decided to return to America the next day, but his wife insisted they go to Kainchi one last
            time to bid farewell. As they sat before Baba&rsquo;s <em>takhat</em>, Baba was inside his room.
            Suddenly, an apple from the top of the <em>takhat</em> rolled down and fell onto the floor. The
            skeptical husband bent down to pick it up.
          </p>
          <p>
            In that exact moment, Baba speedily came out of his room and sat on the <em>takhat</em> in such a
            way that his feet pressed down on the man&rsquo;s hand. Then, pressing his already bent head further
            down with his hand, Baba forced the man into a prone position &mdash; exactly the posture of
            touching Baba&rsquo;s feet that he had despised.
          </p>
          <p>
            Looking down at him, Baba asked, &ldquo;What were you doing at the lake? Were you boating? Did you
            go to swim?&rdquo; Then Baba struck at the core: &ldquo;You were remembering God?&rdquo;
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Breaking of the Skeptic</h2>
          <p>
            Hearing these words, the man suddenly broke down and cried like a child. Baba pulled him close,
            caressed his beard, and asked repeatedly, &ldquo;Tell me, what did you ask God?&rdquo; In that
            moment, the man&rsquo;s resentment disappeared, replaced by overwhelming devotion and love. He
            realised that Baba had heard his desperate prayer even from miles away and had orchestrated this
            &ldquo;accident&rdquo; to give him the miracle he needed.
          </p>
          <p>
            The man later recounted that his entire worldview shifted. He had come as a cynic, but he left as
            a devotee, his heart filled with a love he never thought possible. Baba did not argue with his
            intellect; he simply showed him that the divine is real and intimately personal.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">Reflections</h2>
          <p>
            This leela is a masterclass in how the divine meets the modern, rational mind. Baba did not condemn
            the man&rsquo;s skepticism; he answered it. The rolled apple became the bridge between doubt and
            faith. Baba demonstrated that God is not found through argument, but through the direct experience
            of grace. The American&rsquo;s prayer at the lake &mdash; a genuine cry from the depths of his
            being &mdash; was enough to draw the saint&rsquo;s response. The story remains a powerful reminder
            that no heart is too far, no mind too closed, for the transformative touch of the guru.
          </p>
        </section>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
        <Link href="/stories" className="darshan-btn">&larr; Back to Leelas</Link>
        <Link href="/stories/birth-of-badrivishal" className="bg-white text-divine-saffron border border-divine-saffron px-6 py-3 rounded-full font-semibold hover:bg-divine-saffron hover:text-white transition">
          &larr; Previous: Birth of Badrivishal
        </Link>
        <Link href="/stories/baba-drove-the-car" className="darshan-btn">
          Next: When Baba Drove the Car &rarr;
        </Link>
      </div>
    </article>
  );
}
