import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Neem Karori Baba, his teachings, and the ashram.',
};

const faqs = [
  { q: 'Who is Neem Karori Baba?', a: 'A revered saint from the Himalayas, known for his unconditional love and miracles.' },
  { q: 'How to reach Kainchi Dham?', a: 'Kainchi Dham is near Nainital, Uttarakhand. Nearest railway station is Kathgodam.' },
];

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
      <h1 className="text-4xl font-serif text-sacred-red mb-12 text-center">FAQ</h1>
      <dl className="space-y-6">
        {faqs.map((f, i) => (
          <details key={i} className="divine-card cursor-pointer" open={i === 0}>
            <summary className="text-xl font-serif">{f.q}</summary>
            <p className="mt-4 text-gray-600">{f.a}</p>
          </details>
        ))}
      </dl>
    </div>
  );
}
