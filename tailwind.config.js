/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
  extend: {
    fontFamily: {
      stencil: ['"Saira Stencil"', 'sans-serif'],
      script: ['"Dancing Script"', 'cursive'],
    },
  },
},
  plugins: [],
}