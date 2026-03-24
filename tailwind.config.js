/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2E5BFF",
        success: "#00D97E",
        danger: "#FF4D4D",
        background: "#F8FAFC",
        surface: "#FFFFFF",
        "text-primary": "#1E293B",
        "text-secondary": "#64748B",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}

