/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-white': '#FFFDFE',
        'marshmallow-white': '#FFFDFE',
        'strawberry-cream': '#FFF0F3',
        'vanilla-cream': '#FFF9F2',
        'pastel-pink': '#FFB6C1',
        'soft-blush': '#FFC0CB',
        'baby-pink': '#FFD1DC',
        'frosted-rose': '#F8A5C2',
        'rose-gold': '#E8A598',
        'rose-gold-light': '#F4C2C2',
        'rose-gold-rich': '#D47A6A',
        'champagne-gold': '#F3D299',
        'champagne-sparkle': '#FEE440',
        'pastel-lavender': '#E8D5EA',
        'pastel-mint': '#D8F3DC',
        'pastel-peach': '#FFE5D9',
        'berry-rose': '#5A2A38',
        'deep-rose': '#4A1E2B',
        'pink-panther': '#FFB6C1',
        'gold-antique': '#E8A598',
        'gold-light': '#F4C2C2',
        'gold-rich': '#D47A6A',
        'dark-oak': '#5A2A38',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Cinzel Decorative"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        cinzel: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        cursive: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        'rose-glow': '0 0 25px rgba(232, 165, 152, 0.5)',
        'pink-glow': '0 0 25px rgba(255, 182, 193, 0.6)',
        'gold-glow': '0 0 20px rgba(243, 210, 153, 0.5)',
        'party-glow': '0 0 30px rgba(248, 165, 194, 0.5)',
      }
    },
  },
  plugins: [],
}
