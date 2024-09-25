/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slateBlue: '#2c3e50',
         darkBlue: '#1a252f',  // Custom dark blue
        lightGray: '#dfe6e9',
         lightBlueGray: '#b0bec5',
         'custom-blue': '#e6f2ff',
        'custom-gray': '#f0f0f0',
      },
    },
  },
  plugins: [],
}

