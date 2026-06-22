import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Tiger Leela',
  description: 'Read the miracle story of Neem Karori Baba: tiger.',
};
export default function StoryPage() {
  return <div className="max-w-3xl mx-auto py-16 px-4"><h1 className="text-4xl font-serif text-sacred-red mb-6">Tiger</h1><p>[Placeholder story]</p></div>;
}
