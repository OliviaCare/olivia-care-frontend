/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'olivia-primary': '#5f5ff6',
        'olivia-secondary': '#FFC0CB',
      },
      fontFamily: {
        'unbounded': ['Unbounded', 'sans-serif'],
      },
    },
  },
  plugins: [],
}