import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gift of Life to a Widow&rsquo;s Son – Leela',
  description: 'Baba resurrected a boy from snakebite and vanished without thanks.',
};

export default function LeelaPage() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4 space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-sacred-red">Gift of Life to a Widow&rsquo;s Son</h1>
        <p className="text-lg text-gray-500 italic">
          &ldquo;Your son is not dead. Why are you weeping?&rdquo;
        </p>
      </div>

      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/assets/images/leela-snakebite.webp"
          alt="Baba resurrects a boy"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Urgent Journey</h2>
          <p>
            One day, Baba was travelling by car towards Hanumangarh in Nainital. Far before they reached
            Haldwani, he suddenly ordered the driver, Ramanand, to accelerate &mdash; faster and faster. At a
            desolate, lonely spot between Kathgodam and Jeolikot, Baba told the driver to stop.
          </p>
          <p>
            He stepped out into the forest. Nearby, a woman was weeping uncontrollably over the lifeless body
            of her only son, who had just died from a snakebite. The scene was heart‑rending: a poor widow who
            had already lost her husband, now staring at the death of her last remaining hope.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Command Over Death</h2>
          <p>
            Baba approached her gently and asked, &ldquo;Why are you weeping?&rdquo; Then, as if confirming
            the worst, he said, &ldquo;Was this not your only son?&rdquo; The woman nodded through her tears.
            &ldquo;Your husband is also not alive?&rdquo; he pressed. She began to cry even harder.
          </p>
          <p>
            Then Baba&rsquo;s voice took on a tone of absolute authority: &ldquo;Your son is not dead. Why
            are you weeping? Keep quiet.&rdquo; He bent down, rubbed the boy&rsquo;s cold body with his hands,
            and commanded life to return. Within moments, the boy&rsquo;s eyes fluttered open, and he regained
            consciousness.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Silent Departure</h2>
          <p>
            Without waiting for the woman to express her gratitude, Baba immediately got back into the car and
            drove away, disappearing from sight. He had given life to the dead, but he refused to take any
            recognition for it. The miracle was absolute, yet he left as quietly as he had come, leaving behind
            a stunned mother clutching her resurrected child.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">Reflections</h2>
          <p>
            This leela reveals the seamless blend of omniscience, compassion, and detachment that characterised
            Baba&rsquo;s actions. He knew exactly where the tragedy was unfolding, even though it was far from
            any road. He intervened not because he sought devotees or fame, but because a mother&rsquo;s grief
            was unbearable to his heart. And yet, he vanished before she could even thank him, teaching that
            true service expects nothing in return.
          </p>
          <p>
            The resurrection of the widow&rsquo;s son is a testament to the truth that for a perfected being,
            death is merely a transition that can be reversed by grace. It also reminds us that the most
            profound miracles often happen in the most hidden corners, witnessed only by those who are meant
            to receive them.
          </p>
        </section>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
        <Link href="/stories" className="darshan-btn">&larr; Back to Leelas</Link>
        <Link href="/stories/change-the-weather" className="bg-white text-divine-saffron border border-divine-saffron px-6 py-3 rounded-full font-semibold hover:bg-divine-saffron hover:text-white transition">
          &larr; Previous: I Shall Change the Weather
        </Link>
        <Link href="/stories/birth-of-badrivishal" className="darshan-btn">
          Next: Birth of Badrivishal &rarr;
        </Link>
      </div>
    </article>
  );
}
