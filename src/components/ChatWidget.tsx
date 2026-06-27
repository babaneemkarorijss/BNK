'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { getBotReply, getWebLLMStatus } from '@/lib/chatModelManager';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [onlineStatus, setOnlineStatus] = useState('online');

  useEffect(() => {
    // Auto‑open after 3 seconds with greeting
    const timer = setTimeout(() => {
      setOpen(true);
      setMessages([{
        sender: 'bot',
        text: 'Jai Neem Karori Baba ji ki! 🙏 Main Rahul, Astro Puneet Ji ka shishya. Aapka din mangalmay ho. Aap apni kundli ya koi bhi prashna poochh sakte hain. Ram Ram!',
        time: formatTime(new Date()),
      }]);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Update online status based on WebLLM model readiness
  useEffect(() => {
    const interval = setInterval(() => {
      const status = getWebLLMStatus();
      if (status === 'ready') setOnlineStatus('online');
      else if (status === 'loading') setOnlineStatus('loading');
      else setOnlineStatus('offline');
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    const now = new Date();
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg, time: formatTime(now) }]);
    setLoading(true);

    const history = messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text,
    }));

    try {
      const { reply } = await getBotReply(userMsg, history);
      setMessages(prev => [...prev, { sender: 'bot', text: reply, time: formatTime(new Date()) }]);
    } catch {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Ram Ram! Kshama, kuch samasya aa gayi. Jai Baba!', time: formatTime(new Date()) }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl overflow-hidden border-2 border-green-500 animate-pulse-slow"
          aria-label="Chat with Rahul"
        >
          <Image src="/assets/images/rahul-bhai-avatar.webp" alt="Rahul Bhai" width={64} height={64} className="object-cover" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-0 right-0 z-50 w-full sm:w-96 h-[85vh] sm:h-[32rem] sm:bottom-6 sm:right-6 bg-white rounded-none sm:rounded-2xl shadow-2xl flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-green-600 text-white p-4 flex justify-between items-center sm:rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image src="/assets/images/rahul-bhai-avatar.webp" alt="Rahul Bhai" width={40} height={40} className="rounded-full object-cover" />
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  onlineStatus === 'online' ? 'bg-green-400' : onlineStatus === 'loading' ? 'bg-yellow-400' : 'bg-gray-400'
                }`}></span>
              </div>
              <div>
                <div className="font-semibold text-sm">Rahul Bhai</div>
                <div className="text-xs opacity-80">
                  {onlineStatus === 'online' ? 'online' : onlineStatus === 'loading' ? 'preparing…' : 'offline'}
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-xl">&times;</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#e5ddd5]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-lg shadow-sm text-sm ${
                  m.sender === 'user'
                    ? 'bg-green-100 rounded-br-none'
                    : 'bg-white rounded-bl-none'
                }`}>
                  <div>{m.text}</div>
                  <div className="text-right text-xs text-gray-500 mt-1">{m.time}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-lg rounded-bl-none shadow-sm text-sm text-gray-500">
                  <span className="flex gap-1">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce delay-100">●</span>
                    <span className="animate-bounce delay-200">●</span>
                  </span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t flex items-center gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Apna prashna likhein..."
              className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none"
            />
            <button onClick={sendMessage} className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
