/** @type {import('next').NextConfig} */
import path from 'path';
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
  },
  // i18n: {
  //   locales: ["cs"],
  //   defaultLocale: "cs",
  // },
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
  },
  images: {
    domains: ['localhost'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // Include 4K
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true
  },
  // Enable static optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  // Enable static export
  output: 'export',
};

export default nextConfig;
