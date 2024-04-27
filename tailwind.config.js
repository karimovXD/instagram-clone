/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        black: '#000',
        secondary: '#BDBDBD',
        whiteGreen: '#9DD458',
        lightGray: '#5C5C5C',

      },
      fontFamily: {
        roboto: ['Inter', 'sans-serif'],
      },
    },
    screens: {
      xxl: "1440px",
      xl: "1340px",
      lg: "1280px",
      md: "1024px",
      sm: "768px",
      ss: "640px",
      xs: "480px",
    }
  },
  plugins: [],
}
