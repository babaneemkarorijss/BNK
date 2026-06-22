import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teachings',
  description: 'Core teachings of Neem Karori Baba: Love everyone, serve everyone, remember God.',
};

export default function TeachingsPage() {
  const teachings = [
    { title: 'Love Everyone', body: 'Love is the strongest force in the universe.' },
    { title: 'Serve Everyone', body: 'Selfless service is the path to God.' },
    { title: 'Remember God', body: 'Keep the name of Ram in your heart always.' },
  ];
  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-serif text-sacred-red mb-12 text-center">Teachings</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {teachings.map((t) => (
          <div key={t.title} className="divine-card text-center">
            <h2 className="text-2xl font-serif mb-4">{t.title}</h2>
            <p className="text-gray-600">{t.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
