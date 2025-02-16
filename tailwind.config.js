/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}", // Added html extension
  ],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out forwards",
        slideIn: "slideIn 0.8s ease-out forwards",
        scaleIn: "scaleIn 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
