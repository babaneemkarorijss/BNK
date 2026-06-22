import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seva & Donations',
  description: 'Support the ashram through annadanam, cow seva, or general donation.',
};

export default function SevaPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-serif text-sacred-red mb-12 text-center">Seva & Donations</h1>
      <p className="text-center text-lg mb-8">All donations go directly to langar, cow protection, and temple maintenance.</p>
      <div className="grid md:grid-cols-3 gap-8">
        {['Annadanam', 'Cow Seva', 'General Donation'].map(item => (
          <div key={item} className="divine-card text-center">
            <h2 className="text-2xl font-serif mb-4">{item}</h2>
            <p className="text-sm text-gray-500 mb-4">Account details will appear here</p>
            <p className="font-mono text-divine-saffron">A/C: 1234567890<br />IFSC: SBIN0001234</p>
          </div>
        ))}
      </div>
    </div>
  );
}
