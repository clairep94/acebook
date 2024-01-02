/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        '#bgGrey': '#fafcff',
        '#bgShadowColour': '#d9deed',
        '#bgShadow': '0px_0px_10px_0px_#d9deed',
        '#iconGrey': '#a8b5c8',
        '#iconBlue': '#4d76b2',
        '#fbBlue': '#002c74d4',
        '#placeholderGrey': '#999c9f',
        '#textDarkGrey': '#282828d3',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}

