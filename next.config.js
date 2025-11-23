/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/gts-b',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
