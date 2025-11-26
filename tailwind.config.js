const animate = require("tailwindcss-animate");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: [ "class" ],
  content: [
    "./pages/**/*.{ts,tsx,vue}",
    "./components/**/*.{ts,tsx,vue}",
    "./app/**/*.{ts,tsx,vue}",
    "./src/**/*.{ts,tsx,vue}",
  ],
  prefix: "",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      // '2xl': '1536px',
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        "golden": {
          50: "#FDF6E3",
          100: "#FCF1C7",
          200: "#FAEAA0",
          300: "#F8E378",
          400: "#F6DC51",
          500: "#F5DEB3", // Wheat
          600: "#B8860B", // Dark Goldenrod
          700: "#FFD700", // Gold
          800: "#D4AF37", // Metallic Gold
          900: "#C4A030",
          950: "#B49129",
          DEFAULT: "#F5DEB3",
        },

        // Gray Transparent Color Palette
        "gray-transparent": {
          50: "rgba(255, 215, 0, 0.05)",
          100: "rgba(255, 215, 0, 0.1)",
          200: "rgba(255, 215, 0, 0.15)",
          300: "rgba(255, 215, 0, 0.2)", // Original transparent color
          400: "rgba(255, 215, 0, 0.3)",
          500: "rgba(255, 215, 0, 0.4)",
          600: "rgba(255, 215, 0, 0.5)",
          700: "rgba(255, 215, 0, 0.6)",
          800: "rgba(255, 215, 0, 0.7)",
          900: "rgba(255, 215, 0, 0.8)",
          950: "rgba(255, 215, 0, 0.9)",
          DEFAULT: "rgba(255, 215, 0, 0.2)",
        },

        // Danger Color Palette
        "danger": {
          50: "#FCEAE6",
          100: "#F9D4CC",
          200: "#F5BEB2",
          300: "#F2A998",
          400: "#EE937E",
          500: "#B22222", // Firebrick
          600: "#8B0000", // Dark Red
          700: "#7A1D1D",
          800: "#691919",
          900: "#581515",
          950: "#471111",
          DEFAULT: "#B22222",
        },
      },
      fontFamily: {
        inter: [ "Inter", ...defaultTheme.fontFamily.sans ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [ animate ],
};
