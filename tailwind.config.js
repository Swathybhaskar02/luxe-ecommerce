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
      animation: {
        shimmer: 'shimmer 4s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 160, 80, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(201, 160, 80, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
