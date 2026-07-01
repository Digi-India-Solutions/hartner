/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: {
            50: '#FFFFFF',
            100: '#F9FAFB',
            200: '#F3F4F6',
            300: '#E5E7EB',
            400: '#D1D5DB',
            500: '#9CA3AF',
            600: '#6B7280',
            700: '#4B5563',
            800: '#374151',
            900: '#1F2937',
            950: '#111827',
          },
          accent: {
            50: '#EEF2FF',
            100: '#E0E7FF',
            200: '#C7D2FE',
            300: '#A5B4FC',
            400: '#818CF8',
            500: '#4F46E5',
            600: '#4338CA',
            700: '#3730A3',
            800: '#312E81',
            900: '#23215E',
            950: '#1A1744',
          },
        },
        fontFamily: {
          sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        },
        borderRadius: {
          'btn': '8px',
          'card': '12px',
        },
      },
    },
    plugins: [],
  }