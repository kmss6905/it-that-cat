import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#FFF3E1',
          200: '#FFE0B5',
          300: '#FFCD85',
          400: '#FFB14A',
          500: '#FF9B1E',
        },
        gray: {
          50: '#F2F2F2',
          100: '#DDDDDD',
          200: '#B7B7B7',
          300: '#909090',
          400: '#6D6D6D',
          500: '#4D4D4D',
        },
        black: '#2B2B2B',
      },
      keyframes: {
        tooltip: {
          '0%': { opacity: '0' },
          '40%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '1' },
        },
      },
      animation: { tooltip: 'tooltip 1s ease-in-out' },
    },
  },
  plugins: [],
};
export default config;
