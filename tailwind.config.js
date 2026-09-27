/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        marvel: {
          dark: '#0a0a0f',
          darker: '#050508',
          card: '#0d0d18',
          border: '#1a1a2e',
          text: '#e0e0e8',
          muted: '#8888a0',
        },
        gfg: {
          green: '#2f8d46',
          light: '#5cb85c',
        },
        stone: {
          space: '#00b4d8',
          time: '#2f8d46',
          reality: '#e63946',
          power: '#9b5de5',
          mind: '#f4a261',
          soul: '#e76f51',
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 180, 216, 0.55)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulse-glow 2.5s ease-in-out infinite',
        scan: 'scan-line 10s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
};
