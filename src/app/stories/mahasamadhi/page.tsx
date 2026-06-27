import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The Mahasamadhi Lila – Final Departure',
  description: 'Baba&rsquo;s final divine play – Mahasamadhi on 11 September 1973.',
};

export default function LeelaPage() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-4 space-y-12 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-serif text-sacred-red">The Mahasamadhi Lila</h1>
        <p className="text-lg text-gray-500 italic">
          &ldquo;I am going to be released from Central Jail today.&rdquo;
        </p>
      </div>

      <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
        <Image
          src="/assets/images/leela-mahasamadhi.webp"
          alt="Baba Mahasamadhi"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>

      <div className="space-y-8 text-gray-700 leading-relaxed text-lg">
        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Day of Departure</h2>
          <p>
            The morning of 9 September 1973 dawned like any other over the Kainchi valley, but within the
            ashram, a subtle shift was palpable. A massive crowd of devotees and Westerners had gathered,
            singing outside Baba&rsquo;s <em>kuti</em>. Throughout the day, Baba kept repeating, &ldquo;I have
            to go today.&rdquo; At 10 a.m., he had a ritual bath in Radha Kuti, where Sri Ma and devotees
            worshipped him with water and milk, treating him like a Shivling. Baba told Sri Ma: &ldquo;Wherever
            you may be, all that is auspicious will be with you.&rdquo;
          </p>
          <p>
            At 1 p.m., Baba suddenly announced, &ldquo;I am going now.&rdquo; He gave instructions to close
            the kitchen and send the women devotees home. As he walked towards the car, he held devotees&rsquo;
            hands, laughing and talking, as if he were going on a short trip. He said affectionately, &ldquo;I
            am going to be released from Central Jail today.&rdquo; His blanket slipped off his shoulders twice;
            each time, devotees picked it up and placed it back in the car.
          </p>
          <p>
            As the car left Kainchi, a brilliant, multicoloured <strong>rainbow</strong> appeared in the sky,
            spanning the horizon. It remained visible all the way to Kathgodam, a celestial escort for the
            departing saint. Baba watched it and said, &ldquo;Inder, look at this beautiful creation of God.
            Man cannot create this.&rdquo;
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Final Journey</h2>
          <p>
            That night, Baba boarded the Agra Fort Express. In the train, a devotee offered him milk, which he
            refused. When the devotee insisted, the milk turned sour &mdash; a silent teaching. Baba threw the
            thermos out of the window and said, &ldquo;One should not be attached.&rdquo; On 10 September, he
            reached Agra, got a shave, and told his host to avoid big houses, warning of &ldquo;plundering and
            killing&rdquo; ahead.
          </p>
          <p>
            On the night of 10 September, he took the train back. When it stopped at Mathura, he got off and
            was taken to Vrindavan. He was rushed to the Ramakrishna Mission Hospital. At <strong>1:15 a.m.</strong>,
            on the sacred day of <strong>Anant Chaturdashi</strong>, as doctors prepared to check his blood
            pressure, Baba pulled the oxygen tube from his nose, pushed the instrument aside, whispered
            &ldquo;It is all useless,&rdquo; and repeated the name of God three times: <strong>&ldquo;Jagdish,
            Jagdish, Jagdish.&rdquo;</strong> Then his body became still. He had merged into infinity by
            cardiac arrest.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">The Storm and the Vision</h2>
          <p>
            His body was brought to the Vrindavan ashram. A fierce debate arose over whether to cremate or
            bury him, until Baba Leelanand Thakur (Pagal Baba) arrived and decreed that Baba should be
            cremated at the site of the <em>yagna</em> in the ashram. As the body was brought into the
            courtyard for the pyre, a <strong>terrible, unforeseen storm</strong> burst forth. The sky turned
            pitch black; heavy rain and violent winds shrouded the area, delaying the cremation. Nothing was
            visible beyond ten paces.
          </p>
          <p>
            This storm only ceased the exact moment <strong>Sri Ma</strong> stepped out of her car upon
            arriving at the ashram. The weather cleared instantly, as if nature itself was waiting for her
            presence. Baba&rsquo;s body was placed on a flower‑adorned bier and carried in a grand procession
            around Vrindavan, accompanied by devotional music. At roughly 9 p.m., the pyre was lit.
          </p>
          <p>
            As the flames rose, one devotee, Jagmohan Sharma, saw a divine vision: Baba stood amidst the
            flames, flanked by Lord Ram and Lakshman, while Hanuman ji performed a <em>parikrama</em> around
            them. Thus ended the physical <em>lila</em> of the great saint, though his devotees testify that
            his grace and divine presence continue unabated to this day.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-serif text-sacred-red">Reflections</h2>
          <p>
            The Mahasamadhi of Neem Karori Baba is not a story of death; it is a story of liberation. Every
            detail of those final days was a teaching: the rainbow that accompanied him, the sour milk that
            taught non‑attachment, the warning of plundering, and the final, triumphant cry of
            &ldquo;Jagdish.&rdquo; The storm that raged until Sri Ma arrived symbolises the truth that the
            divine feminine energy is an inseparable part of the guru&rsquo;s work.
          </p>
          <p>
            Devraha Baba&rsquo;s declaration, &ldquo;Baba&rsquo;s death was not a reality. He is alive and will
            ever remain so,&rdquo; is not a sentimental hope; it is the lived experience of thousands who have
            since felt his presence, received his guidance in dreams, and witnessed his miracles. The Mahasamadhi
            lila reveals that the body of a saint is merely a garment. The wearer remains, eternal and
            omnipresent, ready to respond to the call of any heart that utters his name with love.
          </p>
        </section>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-8">
        <Link href="/stories" className="darshan-btn">&larr; Back to Leelas</Link>
        <Link href="/stories/old-laborer-khantia" className="bg-white text-divine-saffron border border-divine-saffron px-6 py-3 rounded-full font-semibold hover:bg-divine-saffron hover:text-white transition">
          &larr; Previous: Old Laborer Khantia
        </Link>
        <Link href="/stories" className="darshan-btn">
          Leelas Home
        </Link>
      </div>
    </article>
  );
}
