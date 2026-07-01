'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  '/assets/images/leela-removal-of-doubt.webp',
  '/assets/images/leela-dumb-child.webp',
  '/assets/images/leela-bullets.webp',
  '/assets/images/leela-weather.webp',
  '/assets/images/leela-snakebite.webp',
  '/assets/images/about-kainchi.webp',
  '/assets/images/about-train-miracle.webp',
  '/assets/images/teachings-hero.webp',
];

export default function Slideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 2700);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
      {images.map((src, idx) => (
        <div key={src} className={`absolute inset-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}>
          <Image src={src} alt={`Slide ${idx + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
        </div>
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button key={idx} onClick={() => setCurrent(idx)} className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === current ? 'bg-white scale-125' : 'bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
}
