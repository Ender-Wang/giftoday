/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
// <<<<<<< Updated upstream
    extend: {
      colors: {
        background: '#FFEFDB',
      lightButton: '#FEC8D8',
      normalButton: '#D291BC',
      darkButton: '#892455',
        themeColor: {
          400: "#810910",
          300: "#A11D2B",
          200: "#C12F47",
          100: "#E14363",
          
        },
      },
// =======
//     extend: {},
//     colors:{
//       background: '#FFEFDB',
//       lightButton: '#FEC8D8',
//       normalButton: '#D291BC',
//       darkButton: '#892455'
// >>>>>>> Stashed changes
    },
  },
  plugins: [],
};
