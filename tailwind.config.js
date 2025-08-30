/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: { /* ... your colors ... */ },
      fontFamily: {
        sans: 'var(--font-geist-sans)',
        mono: 'var(--font-geist-mono)',
        slab: 'var(--font-roboto-slab)',
        serif: 'var(--font-playfair)', // Add this line
      },
      keyframes: { /* ... your keyframes ... */ },
      animation: { /* ... your animations ... */ },
    },
  },
  plugins: [],
};