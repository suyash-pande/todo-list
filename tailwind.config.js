/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        customBlueBackground: "#BCD7FF",
        customBlueButton: "#04A5FF",
      },
    },
  },
  plugins: [],
};
