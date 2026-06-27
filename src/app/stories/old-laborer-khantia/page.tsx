import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Old Laborer Khantia – Leela',
  description: 'Baba&rsquo;s promise of salvation to a poor, lonely man.',
};

export default function LeelaPage() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4 space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-sacred-red">Old Laborer Khantia</h1>
        <p className="text-lg text-gray-500 italic">
          &ldquo;I will get your last rites performed and salvation will be given.&rdquo;
        </p>
      </div>

      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/assets/images/leela-khantia.webp"
          alt="Baba and Khantia"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Forgotten One</h2>
          <p>
            Near the Kainchi ashram, in a crumbling hut that let in both rain and wind, lived an old Nepali
            labourer named Khantia. He possessed nothing of worldly value: no family, no relatives, no money.
            His only companions were two cows, and his only possessions a dented plate and a broken tumbler.
            He had spent his entire life in poverty, invisible to the world. But the heaviest burden he carried
            was not his destitution &mdash; it was the terrifying thought that when he died, there would be no
            one to perform his last rites, and his soul would wander without peace.
          </p>
          <p>
            One day, Khantia saw the crowd around Baba. A thought arose in his simple heart: he could offer
            milk from his beloved cows to the saint. He filled a bottle, walked to the temple, but the crowd
            intimidated him. Timidly, he poured the milk into the river and returned home, his offering unmade.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Divine Gaze</h2>
          <p>
            On another day, he tried again. He reached the bridge with the bottle, but once more Baba was
            surrounded by people. Yet this time, Baba&rsquo;s eyes found the old man instantly. He told
            Bhuvan Chandra Tewari, &ldquo;Escort the old man carefully over the bridge.&rdquo;
          </p>
          <p>
            When the trembling Khantia was brought before him, Baba snatched the milk bottle from his hands and,
            to the astonishment of all, poured the entire contents over his own head. The act was so sudden, so
            intimate, that tears of love welled up in the old man&rsquo;s eyes. Baba asked, &ldquo;What do you
            want?&rdquo; In a tremulous voice, Khantia asked for salvation.
          </p>
          <p>
            Baba&rsquo;s response was immediate and absolute: &ldquo;I will get your last rites performed and
            salvation will be given.&rdquo; To seal the promise, he extended his hand. When Khantia hesitated,
            Baba took the old man&rsquo;s hand in his own &mdash; a divine contract witnessed by the universe.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Saint&rsquo;s Tears</h2>
          <p>
            Baba&rsquo;s heart was moved to tears by the man&rsquo;s destitution. He turned to the devotees
            and described Khantia&rsquo;s condition with heartbreaking precision: &ldquo;Rain water drips in his
            hut. He has a dented plate and a broken tumbler. He has no clothes to wear, no bedding to spread for
            a comfortable night&rsquo;s rest.&rdquo; Immediately, he sent clothes, bedding, utensils, and daily
            meals from the ashram to the old man&rsquo;s hut.
          </p>
          <p>
            When Khantia fell ill, Baba arranged for him to be taken to Ramsay Hospital in Nainital by car,
            covering all medical expenses. He assigned Haridas Baba to care for him personally. And when the
            old labourer finally breathed his last, Baba sent thirteen people to perform his last rites, and
            had the <em>shradh</em> (twelfth‑day rites) conducted at the ashram, exactly as promised. The
            man who had feared dying alone was honoured like a king, because a saint had promised him
            salvation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">Reflections</h2>
          <p>
            This leela is perhaps the most tender of all. Baba did not perform a dramatic, visible miracle;
            instead, he poured his grace into the broken vessel of a forgotten man&rsquo;s life, restoring his
            dignity piece by piece. The milk poured over Baba&rsquo;s head symbolised the complete acceptance
            of the devotee&rsquo;s offering, no matter how small. Khantia had nothing to give but his love, and
            that was enough to move the heart of the divine.
          </p>
          <p>
            The promise of salvation was not a vague hope; it was a contractual guarantee sealed with a
            handshake. Baba demonstrated that the true measure of a saint is not the grandeur of his miracles
            but the depth of his compassion for the least of beings. In Khantia, we see our own fears &mdash;
            the fear of being forgotten, of dying alone, of being unworthy. Baba&rsquo;s response is the
            eternal reassurance: no one is invisible to God, and the smallest offering of love returns a
            hundredfold.
          </p>
        </section>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
        <Link href="/stories" className="darshan-btn">&larr; Back to Leelas</Link>
        <Link href="/stories/baba-drove-the-car" className="bg-white text-divine-saffron border border-divine-saffron px-6 py-3 rounded-full font-semibold hover:bg-divine-saffron hover:text-white transition">
          &larr; Previous: When Baba Drove the Car
        </Link>
        <Link href="/stories/mahasamadhi" className="darshan-btn">
          Next: The Mahasamadhi Lila &rarr;
        </Link>
      </div>
    </article>
  );
}
