/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#000000',
          900: '#050505',
          800: '#0a0a0a',
          700: '#0f0f0f',
          600: '#141414',
          500: '#1a1a1a',
        },
        gold: {
          50: '#fdfbf7',
          100: '#f9f3e8',
          200: '#f0e4cc',
          300: '#e5d0a8',
          400: '#d4b896',
          500: '#c9a87c',
          600: '#b8956a',
          700: '#9a7b55',
          800: '#7d6445',
          900: '#655138',
        },
        cream: {
          50: '#fefdfb',
          100: '#faf8f5',
          200: '#f5f1eb',
          300: '#ebe5db',
          400: '#ddd4c6',
          500: '#cfc3b1',
        },
        rose: {
          50: '#fdf4f5',
          100: '#fbe8ea',
          200: '#f6d1d5',
          300: '#efb3ba',
          400: '#e08d97',
          500: '#c96b77',
          600: '#a85260',
          700: '#8a424e',
          800: '#6d3640',
          900: '#5a2d35',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-outfit)', 'Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(212, 160, 11, 0.1), transparent)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
