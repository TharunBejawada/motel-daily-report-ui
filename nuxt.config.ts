export default defineNuxtConfig({
  ssr: true,

  css: ['~/assets/css/tailwind.css'],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000'
    }
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  devtools: { enabled: false },

  nitro: {
    preset: 'node'
  },

  experimental: {
    // Leave default; disabling new parsers avoids oxc parser surprises
    scanPageMeta: true
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})
