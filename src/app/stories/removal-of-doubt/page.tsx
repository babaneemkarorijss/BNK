import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Removal of Doubt – Leela',
  description: 'How Baba summoned a skeptic and taught that love is the only way.',
};

export default function LeelaPage() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4 space-y-12 animate-fade-in">
      {/* Hero section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-sacred-red">Removal of Doubt</h1>
        <p className="text-lg text-gray-500 italic">
          &ldquo;The only thing dear to Ram is love.&rdquo;
        </p>
      </div>

      {/* Full-width image */}
      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/assets/images/leela-removal-of-doubt.webp"
          alt="Baba summons a skeptic"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      {/* Story content */}
      <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Skeptical Heart</h2>
          <p>
            In May 1944, Ravi Prakash Pande &mdash; later known as Rajida &mdash; was working in Lucknow. When he
            returned from his office, he found his family excitedly preparing to visit a saint, a mysterious Baba
            who had arrived at a neighbour&rsquo;s house. Although Rajida secretly revered holy men, he was a
            hardened skeptic. He could never tell the difference between a true saint and a fraud, and the thought
            of bowing before an unknown sadhu in a neighbour&rsquo;s home filled him with unease. So he refused to
            go, claiming it would be disrespectful to offer salutations in such a setting.
          </p>
          <p>
            After his family left, Rajida sat alone in deep meditation. Guilt and doubt washed over him. In the
            silence of his room, he issued a silent challenge to the saint: if Baba truly was an enlightened soul,
            he would either send for Rajida or come to his house to grant darshan. It was a test born of pride and
            intellectual arrogance, but he was unaware of its gravity.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Summons</h2>
          <p>
            Miles away, at the neighbour&rsquo;s house, Baba abruptly turned to Rajida&rsquo;s sister and asked,
            &ldquo;Where is your brother? Why has he not come here?&rdquo; She tactfully replied that he had just
            returned from his office. Baba&rsquo;s next words were a command: &ldquo;Go and fetch him. Bring him
            here.&rdquo;
          </p>
          <p>
            When his sister arrived home and recounted what had happened, Rajida was stunned. His skepticism
            shattered, he rushed to the neighbour&rsquo;s house and bowed at Baba&rsquo;s feet. But Baba turned
            his eyes away, rose without a word, and left with another devotee. Rajida was left heartbroken and
            utterly alone.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Lesson in Love</h2>
          <p>
            That evening, Rajida prayed again, asking Baba to visit his house. Shortly after, Baba arrived at his
            doorstep with several devotees, lay down on a wooden takhat, and chatted with everyone. Rajida sat
            massaging Baba&rsquo;s feet, desperate to speak, but Baba refused to look at him. Then, as quickly as
            he had arrived, Baba got into a car and departed. Rajida felt miserable &mdash; this was the ugly
            consequence of testing a spiritually elevated soul.
          </p>
          <p>
            Eight long years passed before Rajida met Baba again. This time, in Tagore Town, Allahabad, Baba took
            him by the hand, led him to a secluded spot, and began humming a song:
          </p>
          <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-xl font-serif text-sacred-red">
            &ldquo;Ramahi keval prem piyara&rdquo;
          </blockquote>
          <p>
            <em>The only thing dear to Ram is love.</em> Through this simple, profound act, Baba taught Rajida
            that divine love &mdash; not intellectual testing &mdash; is the only true access to him. From that day
            forward, Rajida became Baba&rsquo;s lifelong devotee.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">Reflections</h2>
          <p>
            This leela reveals the innermost nature of a true saint. Baba did not need to be physically present to
            hear a thought; he responded to Rajida&rsquo;s silent challenge immediately. Yet, he did not reward the
            ego. Instead, he administered a deep spiritual surgery: first exposing the skeptic&rsquo;s pride by
            ignoring him, then later melting it with a song of pure love. It is a timeless reminder that the divine
            cannot be grasped by the intellect, but only by an open, trusting heart.
          </p>
          <p>
            Rajida later wrote, &ldquo;Baba took care of me and he still does.&rdquo; The leela stands as a
            testament that no matter how far we stray into doubt, the guru&rsquo;s grace patiently waits for our
            surrender.
          </p>
        </section>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
        <Link href="/stories" className="darshan-btn">
          &larr; Back to Leelas
        </Link>
        <Link href="/stories/dumb-child-speaks" className="bg-white text-divine-saffron border border-divine-saffron px-6 py-3 rounded-full font-semibold hover:bg-divine-saffron hover:text-white transition">
          Next Leela: The Dumb Child Speaks &rarr;
        </Link>
      </div>
    </article>
  );
}
