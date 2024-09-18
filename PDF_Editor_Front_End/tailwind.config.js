/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mb': '400px', // Custom breakpoint for extra large screens
      },
    },
  },
  plugins: [],
}
