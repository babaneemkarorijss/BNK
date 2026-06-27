import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-midnight-devotion text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="font-serif text-2xl font-bold mb-4 bg-gradient-to-r from-divine-saffron to-golden-light bg-clip-text text-transparent">
            B.N.K. Jyotish Seva
          </h3>
          <p className="text-gray-400 italic">
            &ldquo;Love everyone, serve everyone, remember God.&rdquo;
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif text-lg font-bold mb-4 text-divine-saffron">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link href="/" className="hover:text-white transition">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About Babaji</Link></li>
            <li><Link href="/teachings" className="hover:text-white transition">Teachings</Link></li>
            <li><Link href="/stories" className="hover:text-white transition">Leelas</Link></li>
            <li><Link href="/horoscope" className="hover:text-white transition">Daily Horoscope</Link></li>
            <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-serif text-lg font-bold mb-4 text-divine-saffron">Contact</h4>
          <div className="space-y-2 text-gray-400">
            <p>Plot No. 50, Khasra No. 36</p>
            <p>Fatte Ka Purwa, Mehaura</p>
            <p>Chinhat, Lucknow – 226028</p>
            <p className="mt-3">
              <a href="tel:+916390395151" className="hover:text-white transition">+91 6390395151</a>
            </p>
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-serif text-lg font-bold mb-4 text-divine-saffron">Legal</h4>
          <div className="space-y-2 text-gray-400 text-sm">
            <p>Registered Public Charitable Trust</p>
            <p>Established: 27 November 2024</p>
            <p>Lucknow, Uttar Pradesh</p>
            <p className="mt-3">
              <Link href="/contact" className="hover:text-white transition">Get in Touch</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Baba Neem Karori Jyotish Seva Sansthan. All rights reserved. Jai Baba!
      </div>
    </footer>
  );
}
