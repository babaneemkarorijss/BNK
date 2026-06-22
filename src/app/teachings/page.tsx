import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Teachings', description: 'Core teachings of Neem Karori Baba' };
export default function TeachingsPage() {
  return <div className="max-w-5xl mx-auto py-16 px-4"><h1 className="text-4xl font-serif text-sacred-red mb-12 text-center">Teachings</h1><p>Love everyone, serve everyone, remember God.</p></div>;
}
