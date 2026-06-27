import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Neem Karori Baba',
  description: 'The life, miracles, and Mahasamadhi of Shri Neem Karori Baba – Love incarnate.',
};

export default function AboutPage() {
  return (
    <article className="max-w-5xl mx-auto py-16 px-4 space-y-20">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-sacred-red mb-4">
          Shri Neem Karori Baba (Maharaj‑ji)
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          The divine life of the saint who taught the world to love, serve, and remember.
        </p>
      </header>

      {/* Portrait */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-2xl h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/assets/images/babaji-portrait.webp"
            alt="Neem Karori Baba"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>
      </div>

      {/* 1. Birth and Early Childhood */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">Birth and Early Childhood</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 text-gray-700">
            <p>
              Maharaj‑ji was born as <strong>Laxmi Narian</strong> in a well‑to‑do Brahmin family in Akbarpur,
              District Agra. From birth he exhibited spiritual powers; though he showed no interest in formal
              schooling, he seemed to know everything.
            </p>
            <p>
              At the age of eleven, he warned his family that robbers would break in that night. Dismissed as a
              child&rsquo;s fancy, his prediction came true exactly. This was his first recorded miracle.
            </p>
          </div>
          <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
            <Image
              src="/assets/images/about-childhood.webp"
              alt="Akbarpur village"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        </div>
      </section>

      {/* 2. Renunciation and Early Travels */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">Renunciation &amp; Early Spiritual Travels</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            At eleven, he left home and wandered to Gujarat, living for seven years in an ashram of a Vaishnav
            saint. There he was initiated as an ascetic and given the name <strong>Lakshman Das</strong>. He
            wore matted hair, a loincloth, and carried only a water pot.
          </p>
          <p>
            In Babania, he practised severe austerities, including long immersions in a lake. Even then, his
            divine presence began attracting devotees.
          </p>
        </div>
      </section>

      {/* 3. The Neeb Karori Years */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">The Neeb Karori Years (18 Years)</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Arriving in the village of Neeb Karori (Farrukhabad), he accepted the villagers&rsquo; request to
            stay. They built him an underground cave where he remained immersed in meditation all day, emerging
            only at night. When the cave collapsed, a new one was dug, and on its roof he had a Hanuman temple
            constructed.
          </p>
          <p>
            On the day of the temple&rsquo;s consecration, he shaved his matted hair and began wearing a dhoti.
            He played hide‑and‑seek with village boys (finding anyone instantly, yet turning invisible when hiding),
            climbed trees in impossible ways, and once was discovered with serpents coiled around his body in
            meditation.
          </p>
          <p>
            A train stopped 200 metres away simply to let him board; later the Indian government named a railway
            station <strong>&ldquo;Baba Lakshman Das Puri&rdquo;</strong> in his honour. On another occasion,
            a conductor ordered him off a first‑class compartment – then the train refused to move until he
            re‑boarded. From that day he was famously known as <strong>&ldquo;Baba Neeb Karori.&rdquo;</strong>
          </p>
        </div>
        <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden">
          <Image
            src="/assets/images/about-train-miracle.webp"
            alt="Train miracle at Neeb Karori"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      </section>

      {/* 4. Wanderings and Growth */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">Wanderings, Kilaghat, and Growing Fame</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            After leaving Neeb Karori in 1935, he lived at Kilaghat (Fatehgarh) on the Ganges bank, where he
            reared cows that miraculously obeyed his commands. There he gave darshan to many soldiers and
            transformed the heart of <strong>Colonel J.C. McKenna</strong>, his first Western devotee.
          </p>
          <p>
            He then wandered continuously. Devotion to him grew spontaneously in Bareilly, Haldwani, Almora,
            Nainital, Kanpur, Lucknow, Vrindavan, Allahabad, Delhi, Shimla, and even Madras. He never sought
            followers; they came.
          </p>
        </div>
      </section>

      {/* 5. The Golden Era in the Hills */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">The Golden Era in the Hills (1940s–1970s)</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            In the 1940s, Baba spent much time in Nainital, where townspeople abandoned their chores to follow
            him. He often stayed in devotees&rsquo; homes or on Manora hillside. In the early 1950s, he built
            his first temple, <strong>Hanumangarh</strong>, on that hill. Over the next two decades, he
            established temples and ashrams in Bhumiadhar, Kainchi, Kakrighat, Kanpur, Lucknow, Vrindavan,
            Shimla, and Delhi. Remarkably, he immediately handed over each completed temple to a trust – he had
            no attachment to buildings.
          </p>
          <p>
            He made special arrangements for women in his ashrams, allowing them to participate fully in
            service. Daily bhandara (feeding) never ran short, and he taught: <em>&ldquo;If you do not empty
            the stock, how can it be replenished?&rdquo;</em>
          </p>
          <p>
            Dignitaries including former President V.V. Giri, former Prime Minister Jawahar Lal Nehru, and
            industrialist Jugal Kishore Birla came for his darshan. He treated all – rich and poor, Indian and
            Western – with the same boundless love.
          </p>
        </div>
        <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden">
          <Image
            src="/assets/images/about-kainchi.webp"
            alt="Kainchi Dham ashram"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      </section>

      {/* 6. Mahasamadhi */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">Mahasamadhi – The Final Lila</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            In the months before he left, Baba gave many hints. In 1972 he asked a devotee, <em>&ldquo;Where
            should I leave my body?&rdquo;</em> Two months prior, he said, <em>&ldquo;I have been transferred;
            I must go.&rdquo;</em> He told Western devotees, <em>&ldquo;I am going to be released from Central
            Jail today.&rdquo;</em>
          </p>
          <p>
            On 9th September 1973, a rainbow filled the sky as he departed Kainchi. He travelled to Agra, then
            to Vrindavan where he was admitted to hospital. At <strong>1:15 a.m. on 11th September</strong>, he
            removed his oxygen tube, whispered <em>&ldquo;It is all useless,&rdquo;</em> repeated
            <strong>&ldquo;Jagdish, Jagdish, Jagdish&rdquo;</strong>, and his body became still.
          </p>
          <p>
            His body was cremated inside his Vrindavan ashram. A storm raged during preparations, ceasing only
            when Sri Ma arrived. As the pyre was lit, the saint Devraha Baba declared: <em>&ldquo;Baba&rsquo;s
            death was not a reality. He is alive and will ever remain so.&rdquo;</em>
          </p>
        </div>
        <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden">
          <Image
            src="/assets/images/about-samadhi.webp"
            alt="Mahasamadhi place"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      </section>

      {/* 7. Continuing Presence */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">His Continuing Presence</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Even after Mahasamadhi, Baba continues to appear to devotees in dreams, as a sadhu, a taxi driver,
            or an old village woman, healing incurable diseases and guiding lives. His love is undiminished.
          </p>
          <p>
            As Rajida (Ravi Prakash Pande) wrote: <em>&ldquo;Baba took care of me and he still does.&rdquo;</em>
          </p>
        </div>
      </section>

      {/* 8. Key Teachings Summary */}
      <section className="bg-divine-saffron/10 rounded-2xl p-8 text-center space-y-6">
        <h2 className="text-2xl font-serif text-sacred-red">His Core Message</h2>
        <div className="max-w-2xl mx-auto text-gray-700">
          <p className="mb-4">
            &ldquo;Love everyone, serve everyone, remember God.&rdquo; &mdash; Maharaj‑ji
          </p>
          <Link href="/teachings" className="darshan-btn">Explore His Full Teachings</Link>
        </div>
      </section>

      {/* 9. About the Sansthan (minimal, at end) */}
      <section className="border-t border-divine-saffron/30 pt-12 text-center space-y-4">
        <h2 className="text-2xl font-serif text-sacred-red">Baba Neem Karori Jyotish Seva Sansthan</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          This website is maintained by the Baba Neem Karori Jyotish Seva Sansthan, a registered charitable
          trust dedicated to spreading Maharaj‑ji&rsquo;s teachings through Vedic astrology, daily horoscope,
          and spiritual service. The trust operates from Lucknow, India, and is committed to offering free
          or low‑cost astrological guidance, preserving ancient scriptures, and serving the underprivileged
          through education, health, and community initiatives.
        </p>
        <Link href="/" className="text-divine-saffron font-semibold">Learn more about the Sansthan</Link>
      </section>
    </article>
  );
}
