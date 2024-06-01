/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js, mjs}'],
  theme: {
    extend: {
      container: {
        padding: '0 0.75rem',
        center: true,
      },
      colors: {
        'ys-backgroundAndText': '#0B0821',
        'ys-textAndIconsLight': '#DDDDDD',
        'ys-black': '#09071C',
        'ys-overlay-5': '#17142C',
        'ys-overlay-10': '#232137',
        'ys-overlay-15': '#302D42',
        'ys-overlay-20': '#3C394D',
        'ys-overlay-30': '#545264',
        'ys-purple': '#C7ADFF',
        'ys-pink': '#D55FA8',
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
};
