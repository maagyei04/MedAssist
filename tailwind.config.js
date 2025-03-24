/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'navy': {
          800: '#001A4D',
          900: '#001233',
        },
      },
    }
  },
  plugins: [],
  autoprefixer: {}
}
