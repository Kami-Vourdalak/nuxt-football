// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  publicRuntimeConfig: {
    VUE_APP_USE_API: process.env.VUE_APP_USE_API
  }
})
