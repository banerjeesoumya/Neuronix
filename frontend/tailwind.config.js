/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        gray:{
          100: "#ffffff",
          200: "#f9fbfc",
          400: "#a2a4a8"
        },
        purple:{
          200: "#dfe7ff",
          400: "#443cb5",
          600: "#5046e4"
        }
      }
    },
  },
  plugins: [],
}

