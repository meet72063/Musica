/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '200px',
      'ms':'620px',
      ...defaultTheme.screens,
    },
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
      'outfit':['Outfit', 'sans-serif'],
      'cursive':['Dancing Script', 'cursive'],
      'gorilla':['Gloria Hallelujah', "cursive"],
      'Comfortaa':['Comfortaa', 'cursive'],
    }
  },
  variants: {
    extend: {
        display: ["group-hover"],
    },
},
  plugins: [],
}

