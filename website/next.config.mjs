/** @type {import('next').NextConfig} */
import path from 'path';
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
  },
  // Enable static export
  // output: 'export',
};

export default nextConfig;
