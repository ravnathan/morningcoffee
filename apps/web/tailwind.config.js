/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: '#6f4e37',
        whiteish: '#F9F8FB',
        lightbrown: '#D2B48C'
      },
      borderRadius: {
        'extra' : '500px'
      }
    },
  },
  plugins: [],
}

