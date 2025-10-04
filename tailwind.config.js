
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


// import type { Config } from 'tailwindcss'

// export default {
//   content: [
//     './components/**/*.{vue,js,ts}',
//     './layouts/**/*.vue',
//     './pages/**/*.vue',
//     './plugins/**/*.{js,ts}',
//     './app.vue'
//   ],
//   theme: {
//     extend: {}
//   },
//   plugins: []
// } satisfies Config
