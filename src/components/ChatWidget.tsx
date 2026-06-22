'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

let loadModel: any = null;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user'|'rahul'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const modelReady = useRef(false);

  useEffect(() => {
    if (!open || modelReady.current) return;
    import('@/lib/botEngine').then((engine) => {
      loadModel = engine.initialize;
      engine.initialize().then(() => {
        modelReady.current = true;
        setMessages((prev) => [...prev, { sender: 'rahul', text: 'Ram Ram bhai! Main Rahul, Kainchi Dham se. Aapka din mangalmay ho.' }]);
      });
    });
  }, [open]);

  const send = async () => {
    if (!input.trim() || loading || !modelReady.current) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);
    try {
      const { generateReply } = await import('@/lib/botEngine');
      const reply = await generateReply(userMsg);
      setMessages((prev) => [...prev, { sender: 'rahul', text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { sender: 'rahul', text: 'Kshama, seva mein thodi der ho gayi. Ram Ram.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl overflow-hidden border-2 border-divine-saffron animate-pulse-slow"
          aria-label="Chat with Rahul Bhai"
        >
          <Image src="/assets/images/rahul-bhai-avatar.webp" alt="Rahul Bhai" fill className="object-cover" />
        </button>
      )}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[32rem] bg-white rounded-2xl shadow-2xl flex flex-col border border-divine-saffron/30">
          <div className="bg-divine-saffron text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full relative overflow-hidden">
                <Image src="/assets/images/rahul-bhai-avatar.webp" alt="Rahul Bhai" fill className="object-cover" />
              </div>
              <span className="font-serif text-lg">Rahul Bhai</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-xl">&times;</button>
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
          </div>
          <div className="p-4 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-xl"
              disabled={!modelReady.current}
            />
            <button onClick={send} className="darshan-btn !py-2 !px-4" disabled={!modelReady.current}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
