/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Espresso & Charcoal
        espresso: {
          950: '#151210',
          900: '#241F1B',
          850: '#2C2621',
          800: '#352E28',
          700: '#463D35',
          600: '#5C5247',
          500: '#75695C',
        },
        // Warm Charcoal
        charcoal: {
          950: '#181512',
          900: '#26221E',
          850: '#302B26',
          800: '#3D3730',
          700: '#4F473E',
        },
        // Warm Taupe
        taupe: {
          100: '#F2EDE6',
          200: '#E4DBD0',
          300: '#D5C7B7',
          400: '#BDB09E',
          500: '#9C8F7F',
          600: '#7D7061',
          700: '#5F554A',
          800: '#453E35',
          900: '#2E2923',
        },
        // Muted Beige / Sand
        beige: {
          50: '#FAF7F2',
          100: '#F5EFE7',
          200: '#EAE1D4',
          300: '#E0D4C3',
          400: '#D1C2AD',
          500: '#B8A68F',
          600: '#96846E',
          700: '#756654',
          800: '#52473A',
        },
        // Soft Stone / Warm Limestone
        stonecream: {
          50: '#FDFCF9',
          100: '#F7F4EE',
          200: '#F0EBE2',
          300: '#E5DED3',
          400: '#D6CCC0',
          500: '#BAAFA1',
          600: '#998E80',
          700: '#756B5E',
        },
        // Muted Antique Gold & Champagne
        gold: {
          50: '#FAF7F0',
          100: '#F4ECE0',
          200: '#E8DAC1',
          300: '#DAC59E',
          400: '#C7AD7A',
          500: '#B89A64',
          600: '#A6854F',
          700: '#8E6F3D',
          800: '#6E552D',
          900: '#48371B',
        },
        // Women Luxury Dusty Rose / Rosewood
        rosewood: {
          50: '#FCF9F8',
          100: '#F7F0ED',
          200: '#EEDDD8',
          300: '#E2C8C1',
          400: '#CFADA4',
          500: '#B58E85',
          600: '#9E6B60',
          700: '#7E4F45',
          800: '#5A352D',
          900: '#281E1C',
        },
        // Kids Warm Oatmeal & Honey Sand
        ambercream: {
          50: '#FAF8F3',
          100: '#F5EFE4',
          200: '#EBE1D0',
          300: '#DECDB6',
          400: '#CDB799',
          500: '#B59B77',
          600: '#99784D',
          700: '#7A5E39',
          800: '#544026',
          900: '#262019',
        },
        // Semantic Aliases
        brand: {
          bg: 'var(--bg-primary)',
          'bg-secondary': 'var(--bg-secondary)',
          'bg-tertiary': 'var(--bg-tertiary)',
          'bg-dark': 'var(--bg-dark)',
          surface: 'var(--surface)',
          'surface-raised': 'var(--surface-raised)',
          'surface-card': 'var(--surface-card)',
          'surface-dark': 'var(--surface-dark)',
          'surface-glass': 'var(--surface-glass)',
          border: 'var(--border)',
          'border-light': 'var(--border-light)',
          'border-dark': 'var(--border-dark)',
          accent: 'var(--accent)',
          'accent-hover': 'var(--accent-hover)',
          'accent-soft': 'var(--accent-soft)',
          'text-primary': 'var(--text-primary)',
          'text-secondary': 'var(--text-secondary)',
          'text-muted': 'var(--text-muted)',
          'text-light': 'var(--text-light)',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Cinzel"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['"Amiri"', '"Scheherazade New"', '"Noto Naskh Arabic"', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -10px rgba(50, 44, 38, 0.08), 0 2px 6px -2px rgba(50, 44, 38, 0.04)',
        'luxury-subtle': '0 4px 20px -5px rgba(50, 44, 38, 0.05)',
        'luxury-gold': '0 10px 25px -8px rgba(166, 133, 79, 0.25)',
        'luxury-rose': '0 10px 25px -8px rgba(158, 107, 96, 0.25)',
        'glass': '0 8px 32px 0 rgba(50, 44, 38, 0.06)',
      },
      letterSpacing: {
        'luxury-widest': '0.25em',
        'luxury-wide': '0.15em',
        'luxury-normal': '0.05em',
      },
      animation: {
        'fade-in': 'fadeIn 0.35s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};
