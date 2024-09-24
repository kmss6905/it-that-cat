import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        dropdown: "url('../assets/images/icon_dropdown.png')",
      },
      borderRadius: { '6px': '6px', '10px': '10px' },
      padding: {
        '2px': '2px',
        '6px': '6px',
        '10px': '10px',
        '12px': '12px',
        '14px': '14px',
        '18px': '18px',
        '22px': '22px',
        '26px': '26px',
        '30px': '30px',
      },
      margin: {
        '2px': '2px',
        '6px': '6px',
        '10px': '10px',
        '12px': '12px',
        '14px': '14px',
        '18px': '18px',
        '22px': '22px',
        '26px': '26px',
        '30px': '30px',
      },
      colors: {
        primary: {
          100: '#FFF3E1',
          200: '#FFE0B5',
          300: '#FFCD85',
          400: '#FFB14A',
          500: '#FF9B1E',
        },
        gray: {
          10: '#F0F0F0',
          50: '#F2F2F2',
          100: '#DDDDDD',
          200: '#B7B7B7',
          300: '#909090',
          400: '#6D6D6D',
          500: '#4D4D4D',
        },
        title: 'rgba(0,0,0,0.85)',
        black: '#2B2B2B',
        bgBlack: '#232323',
        error: '#FF5E5E',
        current: '#3581FF',
      },
      keyframes: {
        tooltip: {
          '0%': { opacity: '0' },
          '40%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '1' },
        },
        pingCustom: {
          '75%': { scale: '1.5', opacity: '0' },
          '100%': { scale: '1.5', opacity: '0' },
        },
        'slide-up': {
          '0%': { transform: 'translate(-50%, 100%)' },
          '100%': { transform: 'translate(-50%, 0)' },
        },
        'slide-side': {
          '0%': { transform: 'translate(-50%, 0)' },
          '100%': { transform: 'translate(-50%, 100%)' },
        },
      },
      animation: {
        tooltip: 'tooltip 1s ease-in-out',
        pingCustom: 'pingCustom 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
        'slide-up': 'slide-up 0.4s ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
