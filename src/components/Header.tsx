'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Babaji', href: '/about' },
  { label: 'Teachings', href: '/teachings' },
  { label: 'Leelas', href: '/stories' },
  { label: 'Daily Horoscope', href: '/horoscope' },
  { label: 'Contact', href: '/contact' },
];

const LeafSVGs = () => (
  <>
    <svg className="leaf-icon leaf-icon-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 208.52 511.88">
      <path className="fil-leaf-1" d="M121.86 141.25c16.73,2.91 65.77,9.16 77.74,-14.94 14.49,-29.19 12.6,-56.91 -15.12,-69.09 -11.3,-4.96 -22.28,-7.7 -32.28,-9.66 -24.58,24.72 -41.22,75.51 -43.83,83.82 4.31,3.56 8.81,6.86 13.49,9.87z" />
    </svg>
    <svg className="leaf-icon leaf-icon-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420.62 554.38">
      <path className="fil-leaf-2" d="M1.57 554.38c-0.01,-0.44 -2.46,-153.75 -1.23,-217.01 0.74,-38.16 6.99,-96.57 32.48,-148.36 17.72,-36 44.66,-68.8 85.37,-89.54l32.28 -4.39c21.9,-6.8 39.46,-7.7 45.04,-7.81 4.32,4.98 10.37,12.18 17.72,21.54 -0.39,10.62 -6.13,113.86 -82.32,208.5 -31.36,-18.46 -51.28,-57.42 -51.28,-57.42 52.13,-30.97 58.88,-51.52 69.61,-68.07 10.73,-16.56 2.45,-44.16 -11.65,-26.06 -14.11,18.09 -65.01,68.07 -65.01,68.07 -12.27,-87.7 33.12,-110.39 33.12,-110.39l0.34 -0.64c-27.64,18.92 -47.12,44.59 -60.77,72.35 -24.37,49.53 -30.35,105.69 -31.07,142.44 -1.22,63.07 1.22,216.14 1.23,216.58l-13.85 0.22z"/>
    </svg>
    <svg className="leaf-icon leaf-icon-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 313.64 405.79">
      <path className="fil-leaf-3" d="M268.76 135.61c0,0 -22.17,11.9 -50.23,28.92 -21.12,-5.52 -82.36,-27.74 -81.95,-100.04l-0.14 -0.02c3.32,-12.49 5.48,-21.39 6.11,-24.05 10.61,-20.2 38.05,-50.12 105.57,-37.36 98.73,18.65 57.69,95.74 53.71,98.23 -3.98,2.49 -21.39,6.71 -72.86,-30.59 0,0 -18.15,-14.17 -21.88,12.68 -3.73,26.86 48.99,48.99 61.68,52.23z"/>
    </svg>
    <svg className="leaf-icon leaf-icon-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 359.65 724.72">
      <path className="fil-leaf-4" d="M251.9 132.52c5.01,7.69 14.83,26.38 10.9,50 12.23,19.64 25.84,44.23 37.91,76.21 15.43,40.91 28.34,93.9 32.59,164.05 8.43,139.15 26.3,300.52 26.36,300.99l-8.9 0.95c-0.05,-0.47 -17.95,-162.05 -26.39,-301.41 -4.19,-69.11 -16.87,-121.23 -32.03,-161.42 -10.46,-27.74 -22.12,-49.81 -32.97,-67.87 -11.69,25.15 -46.54,32.88 -60.3,31.22 0,0 7.39,-21.36 26.38,-35.61 18.99,-14.24 -34.02,-32.18 -48.79,33.5 0,0 -17.36,-0.38 -44.69,-16.34 11.21,-15.23 54.9,-71.68 91.8,-79.27 13.37,2.8 23.04,4.3 28.14,5z"/>
    </svg>
    <svg className="leaf-icon leaf-icon-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513.57 1042.57">
      <path className="fil-leaf-5" d="M207.74 252.52c0,0 -3.36,127.53 94.31,130.89 0,0 36.92,0.67 66.79,-32.89 0,0 -39.94,-10.4 -50.01,-47.99 -10.07,-37.59 63.1,-27.52 82.23,3.36 0,0 17.47,-34.44 35.17,-77.24 -60.5,-36.51 -169.57,-35.65 -182.77,-35.4 -16.15,16.52 -28.62,31.28 -37.69,42.91l-0 -0c-3.79,4.86 -6.98,9.18 -9.61,12.86l0.02 -0.03c-0.48,0.66 -0.93,1.31 -1.37,1.93l-0.05 0.08 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.7 1 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07 -0.05 0.07c1.63,-0.35 3.25,-0.73 4.87,-1.16z"/>
    </svg>
  </>
);

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
        ? 'bg-gradient-to-r from-golden-dark via-divine-saffron to-golden-dark shadow-xl'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Desktop navigation (hidden on mobile) */}
        <nav className="hidden md:flex gap-1">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="leaf-btn text-sm px-3 py-2">
              {item.label}
              <LeafSVGs />
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger (hidden on desktop) */}
        <div className="md:hidden w-12">
          <input type="checkbox" id="menu-checkbox" checked={open} onChange={e => setOpen(e.target.checked)} />
          <label className="toggle" htmlFor="menu-checkbox">
            <div id="bar1" className="bars" style={{ backgroundColor: scrolled ? '#1B0A2A' : '#FDF7E7' }}></div>
            <div id="bar2" className="bars" style={{ backgroundColor: scrolled ? '#1B0A2A' : '#FDF7E7' }}></div>
            <div id="bar3" className="bars" style={{ backgroundColor: scrolled ? '#1B0A2A' : '#FDF7E7' }}></div>
          </label>
        </div>

        {/* Centred logo */}
        <Link href="/" className="flex-1 md:flex-none text-center">
          <span className={`font-serif font-bold tracking-wider text-2xl md:text-3xl lg:text-4xl logo-text ${
            scrolled ? 'logo-text-scrolled' : 'text-white drop-shadow-lg'
          }`}>
            B.N.K. JYOTISH SEVA
          </span>
        </Link>

        {/* Spacer for symmetry on mobile */}
        <div className="w-12 md:hidden" />
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-golden-dark/95 to-divine-saffron/95 backdrop-blur-md border-t border-white/20 shadow-2xl">
          <nav className="max-w-3xl mx-auto py-6 px-4 flex flex-wrap justify-center gap-4">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} className="leaf-btn" onClick={() => setOpen(false)}>
                {item.label}
                <LeafSVGs />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
