
export default defineNuxtConfig({
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/style.scss',
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/tailwindcss',

    '@nuxtjs/eslint-module',

    '@pinia/nuxt',
  ],

  /*
  ** Build configuration
  */
  build: {
    transpile: [
      'vee-validate/dist/rules',
    ],
  },
});
