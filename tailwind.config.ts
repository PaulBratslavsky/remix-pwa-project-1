const konstaConfig = require("konsta/config");

module.exports = konstaConfig({
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  konsta: {
    colors: {
      primary: '#ed2fc1'
    }
  },
});
