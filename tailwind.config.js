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
        // Dark mode
        'ys-backgroundAndText': '#0B0821',
        'ys-textAndIconsLight': '#DDDDDD',
        'ys-black': '#09071C',
        // Light mode
        'ys-amethyst-200': '#F8F4FF',
        'ys-amethyst-300': '#E0DFF1',
        'ys-amethyst-400': '#9E9AC8',
        'ys-amethyst-500': '#7A75AF',
        // Different shades of backgroundcolor(#0B0821)
        'ys-overlay-5': '#17142C',
        'ys-overlay-10': '#232137',
        'ys-overlay-15': '#302D42',
        'ys-overlay-20': '#3C394D',
        'ys-overlay-30': '#545264',
        // Buttons
        'ys-buttonPrimary': '#D55FA8',
        'ys-buttonSecondary': '#C7ADFF',
        'ys-buttonTertiary': '#FDB0C4',
        // Logo and Loading colors
        'ys-logoLoader-purple': '#915EFF',
        'ys-logoLoader-pink': '#FF6188',
        'ys-logoLoader-blue': '#51CEE8',
        'ys-logoLoader-yellow': '#FFB740',
      },
    },
  },
  plugins: [],
  darkMode: 'selector',
};
