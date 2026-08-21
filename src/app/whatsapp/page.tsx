'use client';

import { useEffect } from 'react';

export default function WhatsAppRedirectPage() {
  useEffect(() => {
    const phone = '916390395151';
    const message = 'Namaste Acharya Ji, I want to consult.';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.location.replace(url);
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center bg-purple-50">
      <p className="text-lg font-serif text-purple-900">
        Redirecting to WhatsApp…
      </p>
    </main>
  );
}
