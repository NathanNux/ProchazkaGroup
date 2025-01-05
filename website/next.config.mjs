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
