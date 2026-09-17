/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-white': '#fbf7e8',
        'warm-white-dark': '#eee7d0',
        'pink-panther': '#f5d0c6',
        'pink-panther-dark': '#e2b3a6',
        'dusty-mauve': '#A37C76',
        'dusty-mauve-dark': '#825f5a',
        'dusty-mauve-deep': '#3d2927',
        'dusty-merlot': '#62202f',
        'dusty-merlot-dark': '#42131e',
        'dusty-merlot-deep': '#2a0a13',
        'gold-antique': '#d4af37',
        'gold-light': '#f4db7d',
        'gold-rich': '#aa820a',
        'dark-oak': '#3D2B1F',
        'warm-amber': '#D9B382',
        'warm-amber-dark': '#b88f58',
        'vintage-cream': '#E6D8C1',
        'stone-facade': '#ede5d3',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Cinzel Decorative"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        cursive: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        'merlot-glow': '0 0 25px rgba(98, 32, 47, 0.4)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.5)',
        'pink-glow': '0 0 25px rgba(245, 208, 198, 0.45)',
      }
    },
  },
  plugins: [],
}
