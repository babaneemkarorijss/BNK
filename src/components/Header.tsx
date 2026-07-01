'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Babaji', href: '/about' },
  { label: 'Teachings', href: '/teachings' },
  { label: 'Leelas', href: '/stories' },
  { label: 'Horoscope', href: '/horoscope' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-purple-950/95 backdrop-blur-md shadow-2xl shadow-purple-500/20'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1 items-center">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium tracking-wide transition-all duration-300 hover:bg-white/10 rounded-full"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Animated Logo Label */}
        <Link href="/" className="flex-1 md:flex-none flex justify-center">
          <span className="font-serif font-bold tracking-widest text-2xl md:text-3xl logo-animated">
            B.N.K. JYOTISH SEVA
          </span>
        </Link>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
            aria-label="Menu"
          >
            <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${open ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-purple-950/95 backdrop-blur-md border-t border-purple-500/20">
          <nav className="flex flex-col px-6 py-4 gap-3">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white py-2 text-lg font-medium tracking-wide transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
