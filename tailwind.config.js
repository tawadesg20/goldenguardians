/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#D4B996',
          DEFAULT: '#C19A6B',
          dark: '#9F7B4F',
        },
        background: {
          DEFAULT: '#F5F1E3',
          light: '#FFFFFF',
          dark: '#E6DFD1',
        },
        accent: {
          light: '#C5D8C5',
          DEFAULT: '#9AB89A',
          dark: '#7A987A',
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
