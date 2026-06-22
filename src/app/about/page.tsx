import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'About Babaji', description: 'Life of Neem Karori Baba' };
export default function AboutPage() {
  return <div className="max-w-4xl mx-auto py-16 px-4"><h1 className="text-4xl font-serif text-sacred-red mb-8">About Neem Karori Baba</h1><p className="text-lg">Maharaj-ji (c. 1900 – 1973) was a saint of the Himalayan foothills...</p></div>;
}
