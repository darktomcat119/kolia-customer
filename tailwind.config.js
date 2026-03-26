/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E07A2F',
          light: '#F4A261',
          dark: '#C4631E',
          muted: '#FDF0E4',
        },
        secondary: {
          DEFAULT: '#1B5E3A',
          light: '#2D8B5E',
        },
        accent: '#D4A745',
        background: '#FAFAF7',
        surface: {
          DEFAULT: '#FFFFFF',
          hover: '#F5F3EF',
        },
        border: {
          DEFAULT: '#E8E4DD',
          light: '#F0ECE6',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#4B5563',
          tertiary: '#6B7280',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        luxury: '0 12px 48px rgba(26,26,26,0.10)',
        card: '0 10px 30px rgba(26,26,26,0.08)',
      },
      borderRadius: {
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.75rem',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};

