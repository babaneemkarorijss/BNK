'use client';
import { useEffect, useRef, useState } from 'react';
import { generateReply } from '@/lib/botEngine';

export default function ChatDialog({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<{ sender: 'user'|'rahul'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ sender: 'rahul', text: 'Jai Neem Karori Baba ji ki! Main Rahul, Kainchi Dham se. Aapka din mangalmay ho.' }]);
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    try {
      const reply = await generateReply(userMsg);
      setMessages(prev => [...prev, { sender: 'rahul', text: reply }]);
    } catch {
      setMessages(prev => [...prev, { sender: 'rahul', text: 'Kshama, seva mein thodi der ho gayi. Ram Ram.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[32rem] bg-white rounded-2xl shadow-2xl flex flex-col border border-divine-saffron/30">
      <div className="bg-divine-saffron text-white p-4 rounded-t-2xl flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/assets/images/rahul-bhai-avatar.webp" alt="Rahul Bhai" className="w-10 h-10 rounded-full object-cover" />
          <span className="font-serif text-lg">Rahul Bhai</span>
        </div>
        <button onClick={onClose} className="text-xl">&times;</button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-parchment/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${m.sender === 'user' ? 'bg-divine-saffron text-white' : 'bg-white border'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <p className="text-sm text-gray-400 italic">Rahul Bhai typing…</p>}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 border-t flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-xl"
        />
        <button onClick={send} className="darshan-btn !py-2 !px-4">Send</button>
      </div>
    </div>
  );
}
