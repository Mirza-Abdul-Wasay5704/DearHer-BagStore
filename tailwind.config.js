/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FFFFF0",
        cream: "#FFF8F0",
        beige: {
          50: "#FDF8F3",
          100: "#F5EDE4",
          200: "#EDE0D1",
          300: "#DFD0BC",
          400: "#C9B698",
          500: "#B39B74",
          600: "#9A7F56",
          700: "#7A6344",
          800: "#5E4C35",
          900: "#3E3223",
        },
        brand: {
          primary: "#8B7355",
          secondary: "#C9A87C",
          dark: "#3E3223",
          light: "#F5EDE4",
          accent: "#D4A574",
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
