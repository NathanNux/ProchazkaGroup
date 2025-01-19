import path from 'path';
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
    turbo: {
    },
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
    reactRemoveProperties: true, // Remove React dev-only properties
    removeConsole: process.env.NODE_ENV === 'production',
  },
  output: 'export',

  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 8000,
          maxSize: 30000,
          cacheGroups: {
            reactDom: {
              test: /[\\/]node_modules[\\/](react-dom)[\\/]/,
              name: 'react-dom',
              priority: 40,
              chunks: 'all',
            },
            animations: {
              test: /[\\/]node_modules[\\/](framer-motion|lenis)[\\/]/,
              name: 'animations',
              priority: 30,
              chunks: 'all',
              enforce: true,
            },
            core: {
              test: /[\\/]node_modules[\\/](react|next)[\\/]/,
              name: 'core',
              priority: 20,
              chunks: 'all',
            },
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              minChunks: 2,
              priority: 10,
            },
            styles: {
              test: /\.(css|scss)$/,
              name: 'styles',
              chunks: 'all',
              enforce: true,
              priority: 50,
            },
          },
        },
        minimize: true,
        moduleIds: 'deterministic',
      };

      // Babel optimization for large files
      config.module.rules.push({
        test: /\.js$/,
        exclude: /node_modules/, // Skip processing large files
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
            compact: true,
            cacheDirectory: true,
          },
        },
      });
    }

    return config;
  },
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig);
