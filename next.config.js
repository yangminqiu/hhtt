/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    DEEPSEEK_API_BASE_URL: process.env.DEEPSEEK_API_BASE_URL,
  },
}

module.exports = nextConfig 