/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -12px rgba(0,0,0,0.25)'
      }
    },
  },
  plugins: [],
}
