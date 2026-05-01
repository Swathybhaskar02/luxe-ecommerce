/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#c9a050',
          light: '#d4b06a',
          dark: '#b8903f',
        },
        cream: {
          DEFAULT: '#faf9f6',
          dark: '#f5f3ef',
        },
        gray: {
          DEFAULT: '#8a8a8a',
          light: '#e5e5e5',
          dark: '#4a4a4a',
        },
        'luxe-black': '#0a0a0a',
        'luxe-white': '#ffffff',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
