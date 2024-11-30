/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          300: "#e1e6ff",
          500: "#6962d0",
          600: "#5046e4"
        }
      }
    },
  },
  plugins: [],
}

