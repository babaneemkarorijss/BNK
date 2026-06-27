import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'I Shall Change the Weather – Leela',
  description: 'Baba turned scorching summer into freezing cold for a devotee&rsquo;s wedding.',
};

export default function LeelaPage() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4 space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-sacred-red">&ldquo;I Shall Change the Weather&rdquo;</h1>
        <p className="text-lg text-gray-500 italic">
          &ldquo;I shall do the work that nobody else can do.&rdquo;
        </p>
      </div>

      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/assets/images/leela-weather.webp"
          alt="Baba changes the weather"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Invitation</h2>
          <p>
            On 15 June 1973, Hotridutt Sharma travelled to Kainchi to invite Baba to his daughter&rsquo;s
            wedding, set for 18 June. With folded hands he humbly requested Baba&rsquo;s blessings. Baba looked
            at him and said, &ldquo;Pandit, tell me something I can do.&rdquo; Sharma replied, &ldquo;Maharaj,
            you are doing everything.&rdquo;
          </p>
          <p>
            Baba then made a statement that would soon become a legend: &ldquo;I shall do the work that nobody
            else can do.&rdquo; He explained further: &ldquo;There is no electricity in your village. The
            marriage party will be uncomfortable because of the heat, so I shall change the weather. Make
            arrangements for proper bedding as it will be very cold on the 18th and 19th of June.&rdquo;
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Impossible Becomes Reality</h2>
          <p>
            The wedding party arrived on the appointed date. June in Uttar Pradesh is typically scorching, with
            temperatures soaring above 40°C. But as the guests settled in, the sky began to change. First a
            light drizzle fell, and then a chilling wind started blowing from the east. By nightfall, the
            temperature plummeted so drastically that it felt like the cold of November and December.
          </p>
          <p>
            The wedding guests, who had prepared for summer heat, were shivering and thoroughly amazed. Word
            spread among them: &ldquo;Baba said this would happen.&rdquo; Hotridutt Sharma joyfully recounted
            the saint&rsquo;s prediction, and everyone present realised they were witnessing a divine
            intervention. The wedding was celebrated in perfect comfort, wrapped in blankets provided as Baba
            had instructed.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Return to Normal</h2>
          <p>
            Once the marriage party departed, something equally astonishing occurred: the weather immediately
            reverted to its normal, unbearably hot summer state. The brief window of cold had been created
            solely for the duration of the wedding &mdash; not a degree more, not a moment longer.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">Reflections</h2>
          <p>
            This leela demonstrates that the forces of nature are completely malleable in the hands of a
            God‑realised soul. Baba did not merely predict the weather; he commanded it. He altered the very
            climate of a region to honour a devotee&rsquo;s simple request. The lesson is profound: when faith
            is pure and a genuine need is placed before the divine, the entire cosmos realigns itself to
            fulfil it. Baba&rsquo;s words, &ldquo;I shall do the work that nobody else can do,&rdquo; continue
            to inspire countless devotees who rely on his invisible hand in times of impossibility.
          </p>
        </section>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
        <Link href="/stories" className="darshan-btn">&larr; Back to Leelas</Link>
        <Link href="/stories/bullets-absorbed" className="bg-white text-divine-saffron border border-divine-saffron px-6 py-3 rounded-full font-semibold hover:bg-divine-saffron hover:text-white transition">
          &larr; Previous: Bullets Absorbed
        </Link>
        <Link href="/stories/gift-of-life" className="darshan-btn">
          Next: Gift of Life &rarr;
        </Link>
      </div>
    </article>
  );
}
