export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  devServer: {
    port: 1111,
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  ssr: false,
  app: {
    head: {
      title: 'SmartAuto — GitHub Repos',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
})
