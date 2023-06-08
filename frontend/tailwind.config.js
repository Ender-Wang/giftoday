/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // <<<<<<< Updated upstream
    extend: {
      colors: {
        //not highlighted message
        message1: "#D9D9D9",
        message2: "#D2C2CD",

        //yellow
        background: "#FFEFDB",
        //light yellow
        lightBackground: "#FFF4E6",

        //Button
        lightButton: "#FEC8D8",
        normalButton: "#D291BC",
        darkButton: "#892455",

        //PlusButton
        normalPlusButton: "#DD7E9A",
        lightPlusButton: "#D2A5C3",

        //premium user/join Premium Button
        premiumButton: "#5D487F",
        premiumWords: "#FFD700",

        //tag in homepage
        tag: "#E9E1FF",

        //new price for premium
        price: "#F68900",

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
