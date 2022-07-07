/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['codetogeeks.s3.me-south-1.amazonaws.com'],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
}

module.exports = nextConfig
