/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'codetogeeks.s3.me-south-1.amazonaws.com',
    ],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    APP_GOOGLE_CLIENT_ID: process.env.APP_GOOGLE_CLIENT_ID,
  },
}

module.exports = nextConfig
