import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bhajans',
  description: 'Listen to daily kirtans and bhajans in praise of Neem Karori Baba.',
};

export default function BhajansPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-serif text-sacred-red mb-12 text-center">Bhajans</h1>
      <div className="divine-card mb-6">
        <audio controls className="w-full">
          <source src="/assets/videos/hanuman-chalisa.mp4" type="audio/mp4" />
          Your browser does not support audio.
        </audio>
        <p className="mt-2 text-center text-gray-500">Shri Hanuman Chalisa</p>
      </div>
    </div>
  );
}
