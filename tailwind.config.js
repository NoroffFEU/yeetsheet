/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js, mjs}'],
  theme: {
    extend: {
      container: {
        padding: '0 0.75rem',
        start: true,
      },
      colors: {
        'ys-black': '#101216',
        'ys-darkGrey': '#1F2124',
        'ys-mediumGrey': '#939393',
        'ys-lightGrey': '#4A4C4F',
        'ys-whiteGrey': '#D9D9D9',
        'ys-purple': '#915EFF',
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
};
