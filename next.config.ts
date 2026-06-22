import type { NextConfig } from 'next';
const config: NextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/webp', 'image/avif'] },
  experimental: { optimizePackageImports: ['lucide-react', 'framer-motion'] },
};
export default config;
