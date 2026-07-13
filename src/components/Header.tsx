'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-purple-950/90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo – full name with animated gradient */}
        <Link href="/" className="font-serif font-bold tracking-widest text-xl md:text-2xl logo-animated">
          B.N.K. JYOTISH SEVA SANSTHAN
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-4">
          {[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Teachings', href: '/teachings' },
            { label: 'Leelas', href: '/stories' },
            { label: 'Horoscope', href: '/horoscope' },
            { label: 'Contact', href: '/contact' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
