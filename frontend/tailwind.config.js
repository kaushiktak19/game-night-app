/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#000000',
        'gray': {
          900: '#1a1a1a',
          800: '#2e2e2e',
          700: '#3a3a3a',
          600: '#4a4a4a',
          500: '#6e6e6e',
          400: '#a2a2a2',
          300: '#c4c4c4',
          200: '#d9d9d9',
          100: '#f2f2f2',
        },
        'beige': '#f5f5dc',
        'purple': {
          600: '#6d28d9',
          500: '#8b5cf6',
          400: '#a78bfa',
          300: '#d6bcfa',
        },
        'blue': {
          600: '#1e40af',
          500: '#3b82f6',
          400: '#60a5fa',
        },
      },
    },
  },
  plugins: [],
}
