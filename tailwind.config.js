/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#0ea5a4",
        // Sử dụng cùng với CSS var để hưởng lợi alpha utilities: text-brand, bg-brand/10
        purple1: "#451da0",
        purple2: "#8b5ff7",
        blue1: "#2c95ff",
        blue2: "#f6f9ff"
      },
      spacing: {
        container: "1280px",
        gutter: "12px",
      },
      borderRadius: {
        md: "8px",
        xl: "16px",
      },
      fontFamily: {
        lexend: ['"Lexend"', "sans-serif"],
      },
    },
  },
  plugins: [],
}
