/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skyCustom: "#42aaff",
        btnCustom: "#b2c3ff"
      }
    },
  },
  plugins: [],
}

