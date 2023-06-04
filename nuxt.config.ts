
export default defineNuxtConfig({
  /*
  ** Headers of the page
  */
  // head: {
  //   titleTemplate: '%s | utils.hiroxto.net',
  //   meta: [
  //     { charset: 'utf-8' },
  //     { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //     { hid: 'description', name: 'description', content: 'Generic description.' },
  //   ],
  //   link: [
  //     { rel: 'apple-touch-icon', sizes: '192x192', href: '/apple-touch-icon.png' },
  //     { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Noto+Sans+JP&display=swap' },
  //   ],
  // },

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
