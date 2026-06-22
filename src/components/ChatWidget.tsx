'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const ChatDialog = dynamic(() => import('./ChatDialog'), { ssr: false });

export default function ChatWidget() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    import('@/lib/botEngine').then(e => e.initialize()).then(() => {
      setReady(true);
      setTimeout(() => setOpen(true), 1500);
    }).catch(() => setReady(false));
  }, []);

  if (!ready) return null;

  return (
    <>
      {!open && (
        <button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl overflow-hidden border-2 border-divine-saffron animate-pulse-slow">
          <Image src="/assets/images/rahul-bhai-avatar.webp" alt="Rahul Bhai" width={64} height={64} className="object-cover" />
        </button>
      )}
      {open && <ChatDialog onClose={() => setOpen(false)} />}
    </>
  );
}
