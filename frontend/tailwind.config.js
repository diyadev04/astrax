/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        astrax: {
          black: '#050A14',      // Deep Space
          dark: '#0B1B2B',       // Command Navy
          blue: '#00D9FF',       // Electric Cyan
          cyan: '#00D9FF',       // Electric Cyan (Primary)
          violet: '#7C3AED',     // Plasma Violet
          red: '#D946EF',        // Neon Magenta
          white: '#EAFBFF'       // Ice White
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'conic-gradient(from 180deg at 50% 50%, #8a2be233 0deg, #00f0ff33 180deg, #8a2be233 360deg)',
      },
      animation: {
        'glitch': 'glitch 1s linear infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glitch: {
          '2%, 64%': { transform: 'translate(2px, 0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px, 0) skew(0deg)' },
          '62%': { transform: 'translate(0, 0) skew(5deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px #00f0ff' },
          '50%': { opacity: '.5', boxShadow: '0 0 10px #00f0ff' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' }
        }
      }
    },
  },
  plugins: [],
}
