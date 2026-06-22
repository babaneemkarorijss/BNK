import Link from 'next/link';

const socialLinks = [
  {
    href: 'https://instagram.com/neemkarori',
    label: 'Instagram',
    icon: (
      <svg className="instagram-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
        <path fill="#cc39a4" d="M16.5 5C11.539 5 7.5 9.039 7.5 14v20c0 4.961 4.039 9 9 9h15c4.961 0 9-4.039 9-9V14c0-4.961-4.039-9-9-9H16.5zm19 4C37.433 9 39 10.567 39 12.5S37.433 16 35.5 16 32 14.433 32 12.5 33.567 9 35.5 9zM24 14c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0 4a6 6 0 100 12 6 6 0 000-12z"/>
      </svg>
    ),
    className: 'card-instagram',
  },
  {
    href: 'https://twitter.com/neemkarori',
    label: 'Twitter',
    icon: (
      <svg className="twitter-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
        <path fill="#03A9F4" d="M42 12.429c-1.323.586-2.746.977-4.247 1.162 1.526-.906 2.7-2.351 3.251-4.058-1.428.837-3.01 1.452-4.693 1.776C34.967 9.884 33.05 9 30.926 9c-4.08 0-7.387 3.278-7.387 7.32 0 .572.067 1.129.193 1.67-6.138-.308-11.582-3.226-15.224-7.654-.64 1.082-1 2.349-1 3.686 0 2.541 1.301 4.778 3.285 6.096-1.211-.037-2.351-.374-3.349-.914 0 .022 0 .055 0 .086 0 3.551 2.547 6.508 5.923 7.181-.617.169-1.269.263-1.941.263-.477 0-.942-.054-1.392-.135.94 2.902 3.667 5.023 6.898 5.086-2.528 1.96-5.712 3.134-9.174 3.134-.598 0-1.183-.034-1.761-.104C9.268 36.786 13.152 38 17.321 38c13.585 0 21.017-11.156 21.017-20.834 0-.317-.01-.633-.025-.945C39.763 15.197 41.013 13.905 42 12.429"/>
      </svg>
    ),
    className: 'card-twitter',
  },
  {
    href: 'https://github.com/neemkarori',
    label: 'GitHub',
    icon: (
      <svg className="github-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="24" height="24">
        <path d="M15 3C8.373 3 3 8.373 3 15c0 5.623 3.872 10.328 9.092 11.63a1.14 1.14 0 01-.092-.583v-2.051c-.487 0-1.303 0-1.508 0-.821 0-1.551-.353-1.905-1.009-.393-.729-.461-1.844-1.435-2.526-.289-.227-.069-.486.264-.451.615.174 1.125.596 1.605 1.222.478.627.703.769 1.596.769.433 0 1.081-.025 1.691-.121.328-.833.895-1.6 1.588-1.962-3.996-.411-5.903-2.399-5.903-5.098 0-1.162.495-2.286 1.336-3.233-.276-.65-.623-2.567.106-3.297 1.798 0 2.885 1.166 3.146 1.481C13.477 9.174 14.461 9 15.495 9c1.036 0 2.024.174 2.922.483.261-.315 1.349-1.481 3.151-1.481.732.731.381 2.656.102 3.594.836.945 1.328 2.066 1.328 3.226 0 2.697-1.904 4.684-5.894 5.097C18.199 20.49 19 22.1 19 23.313v2.734c0 .104-.023.179-.035.268C23.641 24.676 27 20.236 27 15c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    className: 'card-github',
  },
  {
    href: 'https://discord.gg/neemkarori',
    label: 'Discord',
    icon: (
      <svg className="discord-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
        <path fill="#8c9eff" d="M40 12s-4.585-3.588-10-4l-.488.976C34.408 10.174 36.654 11.891 39 14c-4.045-2.065-8.039-4-15-4s-10.955 1.935-15 4c2.346-2.109 5.018-4.015 9.488-5.024L18 8c-5.681.537-10 4-10 4s-5.121 7.425-6 22c5.162 5.953 13 6 13 6l1.639-2.185C13.857 36.848 10.715 35.121 8 32c3.238 2.45 8.125 5 16 5s12.762-2.55 16-5c-2.715 3.121-5.857 4.848-8.639 5.815L33 40s7.838-.047 13-6C45.121 19.425 40 12 40 12zM17.5 30c-1.933 0-3.5-1.791-3.5-4s1.567-4 3.5-4 3.5 1.791 3.5 4-1.567 4-3.5 4zm13 0c-1.933 0-3.5-1.791-3.5-4s1.567-4 3.5-4 3.5 1.791 3.5 4-1.567 4-3.5 4z"/>
      </svg>
    ),
    className: 'card-discord',
  },
];

export default function Footer() {
  return (
    <footer className="bg-midnight-devotion text-white pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand & Quote */}
        <div>
          <h3 className="font-serif text-2xl mb-4">Shri Neem Karori Baba Sansthan</h3>
          <p className="text-gray-300 italic">“Love everyone, serve everyone, remember God.”</p>
        </div>

        {/* Navigation links */}
        <div>
          <h4 className="font-serif text-lg mb-4 text-divine-saffron">Explore</h4>
          <ul className="space-y-2">
            {['/','/about','/teachings','/stories','/horoscope','/darshan','/bhajans','/seva','/contact','/faq'].map(href => (
              <li key={href}><Link href={href} className="text-gray-300 hover:text-white transition">{href === '/' ? 'Home' : href.slice(1).charAt(0).toUpperCase() + href.slice(2)}</Link></li>
            ))}
          </ul>
        </div>

        {/* Ashram info */}
        <div>
          <h4 className="font-serif text-lg mb-4 text-divine-saffron">Contact</h4>
          <p className="text-gray-300">Kainchi Dham, Nainital<br />Uttarakhand, India</p>
          <p className="text-gray-300 mt-2">Phone: +91-1234567890</p>
          <p className="text-gray-300">Email: info@neemkaroribaba.org</p>
        </div>

        {/* Social cards (Uiverse) */}
        <div>
          <h4 className="font-serif text-lg mb-4 text-divine-saffron">Follow Us</h4>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map(social => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className={`social-card ${social.className}`}>
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 mt-8 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Shri Neem Karori Baba Sansthan. All rights reserved. Jai Baba!
      </div>
    </footer>
  );
}
