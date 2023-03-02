/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainDark: "#2B2C37",
        bgDark: "#20212C",
      },
    },
  },
  plugins: [],
};
