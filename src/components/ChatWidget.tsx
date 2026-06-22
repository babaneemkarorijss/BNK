'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import the actual chat UI, ssr:false to avoid botEngine loading on server
const ChatDialog = dynamic(() => import('./ChatDialog'), { ssr: false });

export default function ChatWidget() {
  const [modelReady, setModelReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Pre-warm the bot engine on page load
    import('@/lib/botEngine').then(engine => engine.initialize()).then(() => {
      setModelReady(true);
      // Auto-open after a short delay with greeting
      setTimeout(() => setOpen(true), 1500);
    }).catch(console.error);
  }, []);

  // Only show the floating button when model is ready
  if (!modelReady) return null;

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl overflow-hidden border-2 border-divine-saffron animate-pulse-slow"
          aria-label="Chat with Rahul Bhai"
        >
          <img src="/assets/images/rahul-bhai-avatar.webp" alt="Rahul Bhai" className="w-full h-full object-cover" />
        </button>
      )}
      {open && <ChatDialog onClose={() => setOpen(false)} />}
    </>
  );
}
