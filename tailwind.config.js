/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainDark: "#2B2C37",
        bgDark: "#20212C",
        borderMain: "#3E3F4E",
        buttonsMain: "#635FC7",
        inputBorder: "rgba(130,143,163,.4)",
        mainText: "#635FC7",
      },
    },
  },
  plugins: [],
};
