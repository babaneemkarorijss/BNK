import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Birth of Badrivishal – Leela',
  description: 'A dead newborn brought back to life by Baba&rsquo;s grace.',
};

export default function LeelaPage() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4 space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-sacred-red">Birth of Badrivishal</h1>
        <p className="text-lg text-gray-500 italic">
          &ldquo;You go to have Badrinath&rsquo;s darshan just after one year from today.&rdquo;
        </p>
      </div>

      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/assets/images/leela-badrivishal.webp"
          alt="Baba resurrects a newborn"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Promise of a Child</h2>
          <p>
            Ram Ratan Sharma&rsquo;s brother‑in‑law was heartbroken. He and his wife had no children, and
            every prayer, every ritual, had failed to grant them the joy of parenthood. In his anguish, he
            approached Baba. Seeing the man&rsquo;s suffering, Baba gave him a clear command: &ldquo;You go
            to have Badrinath&rsquo;s darshan just after one year from today.&rdquo;
          </p>
          <p>
            The couple followed Baba&rsquo;s words with unwavering faith. Exactly one year later, they
            embarked on the pilgrimage to Badrinath. On the road back from the holy shrine, in the town of
            Joshimath, the wife gave birth to a son. Their joy was immense, but tragedy struck on the third
            night. The infant caught a severe cold and died. The parents, overwhelmed with grief, fell asleep
            holding onto their faith that Baba would somehow save their child.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Dream and the Sadhu</h2>
          <p>
            That night, Baba appeared to them in a dream and reassured them: &ldquo;Don&rsquo;t worry. Sri Ram
            will save you.&rdquo;
          </p>
          <p>
            When they woke at dawn, the father took the small, lifeless body wrapped in a white cloth, intending
            to consign it to the holy Ganges. As he stepped outside, he encountered a strange sadhu with tangled
            hair, wearing red clothes, sitting on the floor right outside the door. The sadhu said, &ldquo;I
            understand your grief. Take this child inside, he is alive.&rdquo; He then sprinkled a few drops of
            water from his kamandal onto the dead child.
          </p>
          <p>
            Instantly, the child began to breathe. Life surged back into his tiny body. The father rushed the
            baby inside to his mother. When he came back outside to thank the sadhu, the man had vanished
            without a trace. Baba had given them a son, and they named him Badrivishal &mdash; &ldquo;the great
            one of Badrinath.&rdquo;
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Invisible Hand</h2>
          <p>
            This leela demonstrates that Baba&rsquo;s grace extends beyond life and death. The promise made a
            year earlier was fulfilled, but not without a trial. The baby&rsquo;s death was real, yet Baba
            reversed it through the agency of an unknown sadhu who was none other than Baba himself, operating
            from a distance. The couple&rsquo;s faith was tested and proved unshakable, and they received the
            ultimate gift.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">Reflections</h2>
          <p>
            Badrivishal&rsquo;s story echoes the ancient truth that saints are not bound by the physical realm.
            Baba orchestrated the birth, the death, and the resurrection without ever being physically present
            at the event. The parents&rsquo; unwavering faith &mdash; even in the face of their child&rsquo;s
            death &mdash; became the fertile ground for the miracle. Baba&rsquo;s words, &ldquo;Sri Ram will
            save you,&rdquo; remind us that when a devotee places complete trust in the divine, even the most
            impossible situations become a canvas for grace.
          </p>
        </section>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
        <Link href="/stories" className="darshan-btn">&larr; Back to Leelas</Link>
        <Link href="/stories/gift-of-life" className="bg-white text-divine-saffron border border-divine-saffron px-6 py-3 rounded-full font-semibold hover:bg-divine-saffron hover:text-white transition">
          &larr; Previous: Gift of Life
        </Link>
        <Link href="/stories/american-skeptic" className="darshan-btn">
          Next: The American Skeptic &rarr;
        </Link>
      </div>
    </article>
  );
}
