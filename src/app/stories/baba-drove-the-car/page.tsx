import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'When Baba Drove the Car – Leela',
  description: 'Baba drove through the mountains while the driver slept.',
};

export default function LeelaPage() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4 space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-sacred-red">When Baba Drove the Car</h1>
        <p className="text-lg text-gray-500 italic">
          &ldquo;You are sleeping!&rdquo;
        </p>
      </div>

      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/assets/images/leela-car.webp"
          alt="Baba drives the car"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Exhausted Devotee</h2>
          <p>
            Yogendra Prakash Goel of Bareilly had endured one of those days where the weight of the world
            seemed to press upon his shoulders. He returned home at 8 p.m., utterly spent. Kicking off his
            shoes, he collapsed onto his bed, too tired even to think of food. Just as sleep began to claim
            him, his servant appeared with news that jolted him awake: Baba had arrived.
          </p>
          <p>
            Forcing his weary body into motion, Goel welcomed Baba, served him dinner, and prepared a
            <em>takhat</em> for the saint. He himself lay down on the floor nearby, hoping to catch a few
            hours of rest. Barely half an hour had passed when Baba shook him violently awake and ordered him
            to get the car out of the garage.
          </p>
          <p>
            &ldquo;Where do you want to go?&rdquo; Goel asked, his voice heavy with sleep. &ldquo;Kainchi,&rdquo;
            Baba replied. Goel suggested they go in the morning, but Baba refused. With immense difficulty,
            Goel pulled himself together, brought the car out, and began driving barefoot &mdash; as he always
            sat with Baba without shoes. His eyelids grew heavier with each passing mile.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Treacherous Road</h2>
          <p>
            The hill roads were unforgiving. Sharp bends, sudden drops, and the pitch‑black night made the
            journey perilous even for an alert driver. They had several close calls on the turns. By the time
            they reached Bhumiadhar, Goel wanted to ask Baba to rest, but his tongue had become too heavy to
            form words. The exhaustion had progressed beyond tiredness &mdash; it was now a physical paralysis.
          </p>
          <p>
            As the car left Bhumiadhar, sleep and exhaustion completely overpowered him. He rested his head on
            the steering wheel and fell into a deep, unconscious sleep, forgetting entirely that Kainchi was
            still 12 kilometres away along a treacherous mountain road full of hairpin bends and unguarded
            culverts. He was completely unaware of passing through Bhowali.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Awakening</h2>
          <p>
            Suddenly, Goel was jolted awake by a violent shake from Baba. &ldquo;You are sleeping!&rdquo; Baba
            shouted. Goel woke in a panic, slammed on the brakes, and looked up. He was staring directly at the
            gate of the Kainchi ashram. The car was perfectly positioned, as if it had been guided by an unseen
            hand &mdash; which, in truth, it had.
          </p>
          <p>
            Baba had been awake and entirely in control of the steering wheel the entire journey. The twelve
            kilometres of dangerous mountain road had been traversed safely while the driver slept. Goel
            realised, with a mixture of awe and shame, that the saint had taken over his body, his car, and
            the very laws of physics to bring them home. What should have been a fatal crash became instead a
            quiet arrival, a silent miracle wrapped in the ordinary act of driving.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">Reflections</h2>
          <p>
            This leela is not merely about a miraculous journey; it is a profound allegory of the spiritual
            path. The devotee, exhausted by the world, can no longer steer his own life. He falls asleep at the
            wheel &mdash; symbolising the surrender of the ego. And in that surrender, the guru takes over. Baba
            did not wake Goel to chastise him; he simply completed the journey, allowing the man to rest in the
            safety of his grace.
          </p>
          <p>
            The message is timeless: when you have exhausted your own efforts, when the road ahead seems
            impossible and your strength is gone, place your head on the steering wheel of life and let the
            divine drive. You will wake up exactly where you need to be, at the gates of the ashram of your own
            soul. Baba&rsquo;s words, &ldquo;You are sleeping!&rdquo; were not a rebuke, but a revelation of
            the truth that we are all asleep, and only the guru is truly awake.
          </p>
        </section>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
        <Link href="/stories" className="darshan-btn">&larr; Back to Leelas</Link>
        <Link href="/stories/american-skeptic" className="bg-white text-divine-saffron border border-divine-saffron px-6 py-3 rounded-full font-semibold hover:bg-divine-saffron hover:text-white transition">
          &larr; Previous: The American Skeptic
        </Link>
        <Link href="/stories/old-laborer-khantia" className="darshan-btn">
          Next: Old Laborer Khantia &rarr;
        </Link>
      </div>
    </article>
  );
}
