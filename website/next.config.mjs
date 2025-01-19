import path from 'path';
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: true,
    runtime: 'nodejs'
  },

  sassOptions: {
    includePaths: [path.join(process.cwd(), 'src/styles')],
  },
  images: {
    domains: ['localhost'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    unoptimized: true,
  },
  compiler: {
    // Add styledComponents for better CSS handling
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'production',
  }
  // output: 'export',
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})(nextConfig);