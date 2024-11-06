/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '375': '375px',
      },
      fontSize: {
        '375': '9px', // Adjust the font size as needed
      },
    },
  },
  plugins: [],
}

