import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bullets Absorbed by the Blanket – Leela',
  description: 'Baba absorbed bullets aimed at a surgeon&rsquo;s son during World War II.',
};

export default function LeelaPage() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4 space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-sacred-red">Bullets Absorbed by the Blanket</h1>
        <p className="text-lg text-gray-500 italic">
          &ldquo;All those bullets got stuck in my blanket.&rdquo;
        </p>
      </div>

      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/assets/images/leela-bullets.webp"
          alt="Baba absorbs bullets in a blanket"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Night at the Surgeon&rsquo;s House</h2>
          <p>
            During the chaos of World War II, Baba arrived one day at the home of a civil surgeon in Jhansi.
            The surgeon welcomed him with great devotion and, that night, prepared a comfortable bed on a
            <em>takhat</em> for Baba, while he himself settled on the floor, ready to attend to any need.
          </p>
          <p>
            Around 1 a.m., the surgeon was woken by sounds of restlessness. He turned on the light and saw
            Baba tossing and turning in obvious discomfort. When he asked what was wrong, Baba took his own
            blanket, handed it to the surgeon, and commanded, &ldquo;You go and throw it in the water.&rdquo;
            The bewildered surgeon asked if it could wait until morning, but Baba insisted: &ldquo;Go
            straightaway.&rdquo;
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Midnight Mission</h2>
          <p>
            It was a pitch‑black night. The surgeon woke his servants, drove to a nearby lake, and threw the
            blanket into the water as instructed. He returned just before dawn, still utterly confused. When
            he asked Baba the meaning of this strange act, Baba revealed the miraculous truth:
          </p>
          <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-xl font-serif text-sacred-red">
            &ldquo;Your son, an army officer, was not able to face the German attack. A stampede was caused
            among his troops and he also ran away, but the German soldiers followed him. He jumped off the top
            of a ridge and got stuck in a marsh. The soldiers fired on him from above, and taking him to be
            dead, they left. All those bullets got stuck in my blanket and their heat made me uneasy. When you
            threw the blanket in the lake, I was relieved of my discomfort.&rdquo;
          </blockquote>
          <p>
            The blanket was brand new. There were no holes, no tears, no signs of damage &mdash; yet Baba had
            absorbed every single bullet fired at the surgeon&rsquo;s son into the fabric.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Letter</h2>
          <p>
            Days later, the surgeon&rsquo;s wife received a letter from their son. In it, he narrated the
            exact same escape: how he had been chased, had fallen into a marsh, and had been fired upon. He
            expressed sheer amazement at the &ldquo;unknown power&rdquo; that had saved him from certain
            death. It was only then that the surgeon fully grasped the magnitude of Baba&rsquo;s grace. The
            saint had not merely heard about the event; he had physically taken the bullets into his own body
            to protect a devotee&rsquo;s child.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">Reflections</h2>
          <p>
            This leela shatters the boundaries of what we consider possible. Baba demonstrated that a saint is
            not limited by distance or physical laws. The heat of the bullets troubled his body, but he bore
            the pain willingly &mdash; a living example of the scripture: &ldquo;The saint takes upon himself
            the suffering of his devotees.&rdquo; The surgeon&rsquo;s trust was rewarded, his son&rsquo;s life
            was saved, and a family witnessed a miracle that science could never explain.
          </p>
          <p>
            Even today, this story reminds us that the divine protection of a true guru surrounds us in ways we
            may never see, and that faith transforms even the most hopeless situation into a testament of grace.
          </p>
        </section>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
        <Link href="/stories" className="darshan-btn">&larr; Back to Leelas</Link>
        <Link href="/stories/dumb-child-speaks" className="bg-white text-divine-saffron border border-divine-saffron px-6 py-3 rounded-full font-semibold hover:bg-divine-saffron hover:text-white transition">
          &larr; Previous: The Dumb Child Speaks
        </Link>
        <Link href="/stories/change-the-weather" className="darshan-btn">
          Next: I Shall Change the Weather &rarr;
        </Link>
      </div>
    </article>
  );
}
