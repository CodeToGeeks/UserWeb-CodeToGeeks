/** @type {import('next').NextConfig} */

const nextConfig = {
  // reactStrictMode: true,

  images: {
    // loader: 'custom',
    domains: [
      'codetogeeks.s3.me-south-1.amazonaws.com',
      'lh3.googleusercontent.com',
    ],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    APP_GOOGLE_CLIENT_ID: process.env.APP_GOOGLE_CLIENT_ID,
    APP_Google_Analytics_ID: process.env.APP_Google_Analytics_ID,
  },
}

module.exports = nextConfig
