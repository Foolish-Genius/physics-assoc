/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        // Article and cover images uploaded from the admin editor.
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'media.istockphoto.com',
      },
      {
        protocol: 'https',
        hostname: 'physicsworld.com',
      },
      {
        protocol: 'https',
        hostname: 'www.worldatlas.com',
      },
    ],
  },
};

module.exports = nextConfig;
