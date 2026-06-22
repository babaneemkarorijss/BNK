import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Teachings of Babaji',
  description: 'The spiritual teachings of Shri Neem Karori Baba – love, service, surrender, and the power of Ram’s name.',
};

export default function TeachingsPage() {
  return (
    <article className="max-w-5xl mx-auto py-16 px-4 space-y-20">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-sacred-red mb-4">Teachings of Shri Neem Karori Baba</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Love, Serve, Remember. These three words encapsulate the eternal message of Maharaj‑ji. Below are his
          own words, compiled from <em>Divine Reality: Shri Neeb Karori Ji Maharaj</em> by Ravi Prakash Pande.
        </p>
      </header>

      {/* Image */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-2xl h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/assets/images/teachings-hero.webp"
            alt="Babaji teaching"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>
      </div>

      {/* 1. On God, the Universe, and the Concept of Family */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">1. On God, the Universe, and the Concept of Family</h2>
        <p>
          Maharaj‑ji saw the entire cosmos as one family, where God resides in every heart and every being.
          His teachings on universal kinship are foundational to his message.
        </p>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;The whole universe is our home and all residing in it belong to our family. Every woman is a mother or
          sister and every man a father or brother. This is all God&rsquo;s family. You can do service of the highest
          order only if your thoughts are centered on God. Instead of trying to see God in a particular appearance,
          it is better to see him in everything.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 8</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;All religions are basically the same and they all lead to God. All human beings are equal.
          The blood that circulates in the body through the heart is the same in all.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 13</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;God resides within every heart.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 14</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;Everyone is poor before God.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 11</footer>
        </blockquote>
      </section>

      {/* 2. The Path to God-Realization */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">2. The Path to God‑Realization: Love, Surrender, and Grace</h2>
        <p>
          For Babaji, the highest spiritual practice was not complex ritual but simple, childlike love and
          complete surrender to the divine will. Grace, he taught, is the ultimate key.
        </p>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;There is nothing dearer to Ram than love.&rdquo; (Ramahi keval prem piyara)
          <footer className="mt-2 text-sm text-gray-500">— Pages 14, 21</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;Surrender to God&rsquo;s will above everything else so that they might develop love and faith in him...
          O Lord of the Helpless! The strings of my destiny are in thy hand. Like a fish in deep water, everyone
          is secure and happy under the protection of God.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 15</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;Have trust in God and the most difficult tasks become easy. For success, hard work alone is not
          enough, God&rsquo;s grace is essential.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 15</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;Go on worshipping God in thought, word, and action. Then you will be able to perform nishkama karma
          [deeds without attachment]. The ability of nishkama karma can be achieved only by his grace and cannot
          be acquired by any other means. None can claim a right to his grace. It is up to him to give it, to
          refuse it, or to take it away.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 15</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;Why beg from a man, what can he give? God and the saints are all powerful but no one has to beg
          anything from them. They know all and so they themselves give what is appropriate.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 136</footer>
        </blockquote>
      </section>

      {/* 3. The Power of the Divine Name */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">3. The Power of the Divine Name and Prayer</h2>
        <p>
          Chanting &ldquo;Ram&rdquo; was Babaji&rsquo;s central practice. He taught that even one sincere repetition
          of the name can transform a life.
        </p>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;Ram&rsquo;s form left this world, Krishna&rsquo;s form left this world, but the name stays.
          By reciting his name everything is achieved.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Pages 14‑15</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;One true recitation of the name of Ram from the heart was equal to countless recitations otherwise.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 15</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;If you can&rsquo;t do it with true feeling and you don&rsquo;t want to otherwise, what will you do then?
          Something is better than nothing. To begin with, one may not be entirely sincere, but in due course of
          time, the thoughts get purified and the honesty of intention comes by itself... Go on reciting Ram and
          one day the true call for Ram will come out and you will be redeemed.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 15</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;Constant repetition of God&rsquo;s name, even without feelings of devotion, in anger or lethargy,
          brings out his grace. Once this is realized, there is no room for any misgivings.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 31</footer>
        </blockquote>
      </section>

      {/* 4. On Spiritual Practice, Meditation, and Service */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">4. On Spiritual Practice, Meditation, and Service (Seva)</h2>
        <p>
          Babaji simplified spirituality: you do not need complicated meditation. Just remember God and serve others.
        </p>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;The mind, bound by the physical body, has its own limitations. A meditative state of mind must be
          acquired gradually or else there is a risk of becoming insane. It is true that concentration imparts an
          insight that can lead to self‑realization, but for those who remember God and serve living beings,
          meditation and other kinds of ritual worship are not necessary. Remembering God and cultivating the seva
          bhav [spirit of service] are easy methods to progress on the spiritual path.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 33</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;You can do service of the highest order only if your thoughts are centered on God.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 8</footer>
        </blockquote>
      </section>

      {/* 5. Obstacles: Attachment, Ego, and Illusion */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">5. Obstacles to Spiritual Progress: Attachment, Ego, and Illusion</h2>
        <p>
          The greatest barriers to God are our own ego and attachment. Babaji taught that the world is an illusion
          created by the mind.
        </p>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;Attachment and ego are the greatest hindrances to the realization of God... a learned man and a fool
          are alike as long as there is attachment and ego in the physical body.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 15</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;Delusion makes everything look real. Attachment is only dispelled by his grace.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 31</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;Of this world I am, desirous of the world I am not, passing through the bazaar I am, the buyer I am not.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 15 (quoting Kabir)</footer>
        </blockquote>
      </section>

      {/* 6. Charity, Generosity, and Past Life Karma */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">6. On Charity, Generosity, and Past Life Karma</h2>
        <p>
          True giving, Babaji explained, comes from the soul&rsquo;s past impressions and reflects the abundance of
          God&rsquo;s universe.
        </p>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;To give or sacrifice for another at the cost of hardship to yourself is very difficult. Such acts can
          only be performed because of sanskaras [predispositions or positive tendencies] of previous births.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 11</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;If you do not empty the stock, how can it be replenished?&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 8</footer>
        </blockquote>
      </section>

      {/* 7. Family Dharma */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">7. Family Dharma: Respecting Parents as the Supreme Sadhana</h2>
        <p>
          For Maharaj‑ji, caring for one&rsquo;s parents was the highest spiritual practice, greater than any yoga or meditation.
        </p>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;It is not necessary to seek God so long as the parents are alive. The worship of living parents is
          difficult, but it is the best sadhana [spiritual practice].&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 13</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;A wife dedicated to her husband is greater than a yogi.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 15</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;Mother is the image of God.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 15</footer>
        </blockquote>
      </section>

      {/* 8. On Human Conduct, Justice, and Truthfulness */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">8. On Human Conduct, Justice, and Truthfulness</h2>
        <p>
          Honesty, respect for saints, and acceptance of personal karma were non‑negotiable in Babaji&rsquo;s presence.
        </p>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;You can lie to your father, he is a simple man. But you can&rsquo;t deceive Baba.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 27</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;You should never bother a sadhu in this way, understand?&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 76</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;That night you were asking why God was punishing the boy for your sins. You should never say so.
          God does not do this. Man himself suffers because of his own karma.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 224</footer>
        </blockquote>
      </section>

      {/* 9. On the Role of a Guru and Devotion */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">9. On the Role of a Guru and the Nature of Devotion</h2>
        <p>
          Babaji rejected formal hierarchies, creating instead a community of equals bound by love.
        </p>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;I make devotees, not disciples.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 9</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;I do not know anything. I just know how to change hearts.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 323</footer>
        </blockquote>
      </section>

      {/* 10. On Divine Intervention and the Impossible */}
      <section className="divine-card space-y-6">
        <h2 className="text-3xl font-serif text-sacred-red">10. On Divine Intervention, Destiny, and the Impossible</h2>
        <p>
          Maharaj‑ji often stated his absolute power over nature and destiny, yet his actions were always an expression
          of divine will.
        </p>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;I am capable of changing destiny. There is no power in the world that can go against what I have said.
          I can lower the exalted and raise the humble.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 203</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;I shall do the work that nobody else can do.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 167</footer>
        </blockquote>
        <blockquote className="border-l-4 border-divine-saffron pl-4 italic text-gray-700">
          &ldquo;I will not die.&rdquo;
          <footer className="mt-2 text-sm text-gray-500">— Page 335</footer>
        </blockquote>
      </section>

      {/* Summary */}
      <section className="bg-divine-saffron/10 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-serif text-sacred-red mb-4">The Heart of Maharaj‑ji&rsquo;s Message</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Love everyone, serve everyone, remember God. These simple but profound instructions are the complete
          spiritual path. As Babaji often said, <em>&ldquo;Ram Ram.&rdquo;</em>
        </p>
        <div className="mt-6">
          <Link href="/" className="darshan-btn">Return Home</Link>
        </div>
      </section>
    </article>
  );
}
