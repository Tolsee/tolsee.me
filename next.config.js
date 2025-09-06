/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      'prism',
      'gray-matter',
      'remark',
      'remark-html',
      'remark-prism',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
