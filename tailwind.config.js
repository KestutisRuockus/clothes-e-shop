/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        brandTitle: ["Bebas Neue"],
        base: ["Poppins"],
        name: ["Barlow Semi Condensed"],
      },
    },
  },
  plugins: [],
};