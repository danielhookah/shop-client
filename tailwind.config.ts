import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: 'var(--tw-color-primary-50)',
          100: 'var(--tw-color-primary-100)',
          200: 'var(--tw-color-primary-200)',
          300: 'var(--tw-color-primary-300)',
          400: 'var(--tw-color-primary-400)',
          500: 'var(--tw-color-primary-500)',
          600: 'var(--tw-color-primary-600)',
          700: 'var(--tw-color-primary-700)',
          800: 'var(--tw-color-primary-800)',
          900: 'var(--tw-color-primary-900)',
          950: 'var(--tw-color-primary-950)',
        },
        black: '#000000',
        grey: '#707070',
        'light-grey': '#dadada',
        white: '#FFFFFF',
        yellow: '#F5D73F',
        orange: '#F5843F',
        'light-blue': '#26B9E7',
        blue: '#76b7e5',
        red: '#ff4040',
        green: '#D09B34',
        'light-green': '#FFF4DE',
        dark: '#222222',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
