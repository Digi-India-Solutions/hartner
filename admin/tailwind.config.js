/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FAF9F5",
          100: "#F3EFE3",
          200: "#E3DAC0",
          300: "#D0BE96",
          400: "#BC9E6C",
          500: "#A37C4C",
          600: "#89613A",
          700: "#6F4C2C",
          800: "#553720",
          900: "#3D2516",
          950: "#27160C",
        },
        navy: {
          50: '#f4f6fa',
          100: '#e9edf5',
          200: '#ced9eb',
          300: '#a3badb',
          400: '#7195c6',
          500: '#4e77ae',
          600: '#3d5f93',
          700: '#324d77',
          800: '#2d4264',
          900: '#293a55',
          950: '#1b2435',
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
