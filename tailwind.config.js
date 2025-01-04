/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#faf5ff',
          // ... 其他紫色色阶
          600: '#9333ea',
          700: '#7e22ce',
        }
      }
    },
  },
  plugins: [],
} 