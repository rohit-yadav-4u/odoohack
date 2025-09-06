/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2ecc71",    // green
        secondary: "#27ae60",  // darker green
        accent: "#a3e635",     // light green
        dark: "#111111"
      }
    }
  },
  plugins: [],
}
