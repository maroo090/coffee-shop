/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          950: '#150C07', // Extra Deep Dark Espresso
          900: '#23140C', // Dark Espresso
          800: '#3D2316', // Dark Brown
          700: '#583421', // Medium Dark Brown
          600: '#79472E', // Rich Coffee Brown
          500: '#9B5D3B', // Warm Coffee Accent
          400: '#C48459', // Warm Latte
          300: '#D69E77', // Light Caramel
          200: '#E8C9B3', // Creamy Beige
          100: '#F5E8DD', // Soft Cream
          50:  '#FAF5F0', // Ultra Soft Off-White
          accent: '#D4A373',
          gold: '#E5A93C',
          cream: '#FAF6F0',
          beige: '#F3E9DC'
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'coffee-soft': '0 10px 30px -10px rgba(35, 20, 12, 0.08)',
        'coffee-glow': '0 0 25px rgba(212, 163, 115, 0.25)',
        'coffee-deep': '0 20px 40px -15px rgba(21, 12, 7, 0.25)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.4s ease-out forwards',
        'pulse-subtle': 'pulse-subtle 3s infinite ease-in-out',
        'float': 'float 4s infinite ease-in-out',
      }
    },
  },
  plugins: [],
}
