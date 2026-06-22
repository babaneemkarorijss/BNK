'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Babaji', href: '/about' },
  { label: 'Teachings', href: '/teachings' },
  { label: 'Leelas', href: '/stories' },
  { label: 'Daily Horoscope', href: '/horoscope' },
  { label: 'Live Darshan', href: '/darshan' },
  { label: 'Bhajans', href: '/bhajans' },
  { label: 'Seva', href: '/seva' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

const LeafSVGs = () => (
  <>
    <svg className="leaf-icon leaf-icon-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 208.52 511.88">
      <path className="fil-leaf-1" d="M121.86 141.25c16.73,2.91 65.77,9.16 77.74,-14.94 14.49,-29.19 12.6,-56.91 -15.12,-69.09 -11.3,-4.96 -22.28,-7.7 -32.28,-9.66 -24.58,24.72 -41.22,75.51 -43.83,83.82 4.31,3.56 8.81,6.86 13.49,9.87zm-17.26 41.05c2.87,7.92 8.26,29.59 7.63,79.7 -0.16,12.74 -0.48,25.41 -0.81,38.43 -1.4,55.59 -2.96,117.52 7.12,210.69l-7.09 0.75c-10.12,-93.56 -8.56,-155.77 -7.15,-211.61 0.33,-13.06 0.65,-25.77 0.81,-38.35 0.53,-42.42 -3.06,-63.29 -5.69,-72.77 -7.55,8.48 -18.48,15.07 -34.33,16.54 -26.77,2.47 -43.19,-16.99 -52.84,-36.58 16.49,-8.49 65.65,-32.22 98.27,-31.47 1.86,1.42 3.76,2.8 5.69,4.13 -0.15,5.56 -1.43,24.61 -11.62,40.53zm-41.18 -148.65c-0.32,0.84 1.68,9.87 -6.19,10.71 -7.87,0.84 -3.26,-5.14 -6.82,-7.98 -3.57,-2.84 -9.97,-14.59 1.99,-15.96 11.97,-1.37 11.02,13.23 11.02,13.23zm124.63 55.54c0,0 -3.89,14.8 -10.18,18.69 -6.3,3.88 -22.78,7.24 -28.87,0.11 -6.09,-7.14 -1.57,-31.71 17.64,-30.45 19.21,1.26 22.68,8.4 21.42,11.65zm-101.53 67.51c0,0 5.88,5.56 5.46,9.87 -0.42,4.3 -5.78,19.21 -14.07,20.05 -8.29,0.84 -24.15,-6.82 -21.84,-17.53 2.31,-10.71 10.5,-11.34 12.6,-10.6 2.1,0.74 3.36,2.1 17.85,-1.78zm61.49 -109.94c-12.74,-2.33 -23.63,-3.69 -31.15,-7.4 0,0 -2.41,15.22 -4.51,19.74 -2.1,4.51 -6.3,17.32 -14.8,21.1 -8.5,3.78 -9.87,-28.14 4.62,-45.15 0,0 -10.13,-4.4 -22.34,-9.92 -11.47,31.21 -7.3,64.58 -7.28,64.68l-0.48 0.06c9.73,14.77 20.76,28.04 33.37,39.01 3.68,-11.43 19.48,-57.46 42.58,-82.12zm-71.44 -23.1c-16.59,-7.55 -35.59,-16.58 -38.25,-19.47 -1.97,-2.14 -4.87,-3.72 -7.63,-4.2 9.11,27.4 20.23,54.59 34.36,78.62 1.13,1.92 2.28,3.82 3.45,5.7 -0.66,-11.21 -0.85,-36.56 8.07,-60.65z"/>
    </svg>
    <svg className="leaf-icon leaf-icon-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420.62 554.38">
      <path className="fil-leaf-2" d="M1.57 554.38c-0.01,-0.44 -2.46,-153.75 -1.23,-217.01 0.74,-38.16 6.99,-96.57 32.48,-148.36 17.72,-36 44.66,-68.8 85.37,-89.54l32.28 -4.39c21.9,-6.8 39.46,-7.7 45.04,-7.81 4.32,4.98 10.37,12.18 17.72,21.54 -0.39,10.62 -6.13,113.86 -82.32,208.5 -31.36,-18.46 -51.28,-57.42 -51.28,-57.42 52.13,-30.97 58.88,-51.52 69.61,-68.07 10.73,-16.56 2.45,-44.16 -11.65,-26.06 -14.11,18.09 -65.01,68.07 -65.01,68.07 -12.27,-87.7 33.12,-110.39 33.12,-110.39l0.34 -0.64c-27.64,18.92 -47.12,44.59 -60.77,72.35 -24.37,49.53 -30.35,105.69 -31.07,142.44 -1.22,63.07 1.22,216.14 1.23,216.58l-13.85 0.22z"/>
    </svg>
    <svg className="leaf-icon leaf-icon-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 313.64 405.79">
      <path className="fil-leaf-3" d="M268.76 135.61c0,0 -22.17,11.9 -50.23,28.92 -21.12,-5.52 -82.36,-27.74 -81.95,-100.04l-0.14 -0.02c3.32,-12.49 5.48,-21.39 6.11,-24.05 10.61,-20.2 38.05,-50.12 105.57,-37.36 98.73,18.65 57.69,95.74 53.71,98.23 -3.98,2.49 -21.39,6.71 -72.86,-30.59 0,0 -18.15,-14.17 -21.88,12.68 -3.73,26.86 48.99,48.99 61.68,52.23zm-6.57 270.17c-0.06,-0.43 -20.14,-148.39 -56.4,-233.41 -9.42,5.88 -19.19,12.19 -28.79,18.69 0,0 -17.41,-10.44 -27.6,-29.59 -10.2,-19.15 -5.22,-21.76 -13.43,-22.26 -8.21,-0.5 -5.1,34.69 19.52,64.78 0,0 -13.7,11.34 -26.34,23.33 -5.68,-9.69 -18.35,-34.11 -23.43,-66.68l-0.05 -0.01c0.31,-0.8 0.62,-1.59 0.93,-2.38 10.57,-26.8 19.85,-57.53 26.36,-81.01 6.01,61.39 57.45,83.42 80.65,90.27 37.09,86.22 59.66,236.37 59.72,236.8l-11.15 1.45z"/>
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
        {/* Hamburger on left */}
        <div className="w-12">
          <input type="checkbox" id="menu-checkbox" checked={open} onChange={e => setOpen(e.target.checked)} />
          <label className="toggle" htmlFor="menu-checkbox">
            <div id="bar1" className="bars" style={{ backgroundColor: scrolled ? '#1B0A2A' : '#FDF7E7' }}></div>
            <div id="bar2" className="bars" style={{ backgroundColor: scrolled ? '#1B0A2A' : '#FDF7E7' }}></div>
            <div id="bar3" className="bars" style={{ backgroundColor: scrolled ? '#1B0A2A' : '#FDF7E7' }}></div>
          </label>
        </div>

        {/* Centered Logo */}
        <Link href="/" className="flex-1 text-center">
          <span className={`font-serif text-2xl md:text-3xl font-bold tracking-wider ${
            scrolled ? 'text-midnight-devotion' : 'text-white drop-shadow-lg'
          }`}>
            Shri Neem Karori Baba
          </span>
        </Link>

        {/* Symmetry */}
        <div className="w-12" />
      </div>

      {/* Dropdown menu (golden background) */}
      {open && (
        <div className="absolute top-full left-0 right-0 bg-gradient-to-b from-golden-dark/95 to-divine-saffron/95 backdrop-blur-md border-t border-white/20 shadow-2xl">
          <nav className="max-w-3xl mx-auto py-6 px-4 flex flex-wrap justify-center gap-4">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="leaf-btn"
                onClick={() => setOpen(false)}
              >
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
