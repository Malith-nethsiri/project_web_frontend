/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'api.valuerpro.com', 'project-web-backend-production.up.railway.app'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  },
  // Configure for Railway deployment
  experimental: {
    outputFileTracingRoot: require('path').join(__dirname, './'),
  },
}

module.exports = nextConfig