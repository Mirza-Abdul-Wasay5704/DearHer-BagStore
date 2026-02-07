/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Background: Soft Ivory / Warm Cream
        ivory: "#FAF6F1",
        cream: "#FAF6F1",
        // Supporting Neutral scale: Warm Taupe / Sand
        beige: {
          50: "#FAF6F1",
          100: "#F5EDE4",
          200: "#D6C7B8",
          300: "#C9B9A8",
          400: "#B8A494",
          500: "#9A8A7A",
          600: "#7A6B5C",
          700: "#5C4F42",
          800: "#4A3B2A",
          900: "#2F2418",
        },
        brand: {
          // Accent: Muted Blush / Nude Rose
          primary: "#E7C1B3",
          // CTA: Deep Cocoa Brown
          secondary: "#2F2418",
          // Primary Text: Warm Mocha Brown
          dark: "#4A3B2A",
          // Light background variant
          light: "#FAF6F1",
          // Accent/highlight
          accent: "#E7C1B3",
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
