/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        themeColor: {
          400: "#810910",
          300: "#A11D2B",
          200: "#C12F47",
          100: "#E14363",
        },
      },
    },
  },
  plugins: [],
};
