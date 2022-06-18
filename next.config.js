/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['codetogeeks.s3.me-south-1.amazonaws.com'],
  },
}

module.exports = nextConfig
