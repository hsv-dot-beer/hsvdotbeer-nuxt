export default defineNuxtConfig({
  compatibilityDate: '2024-08-01',

  modules: ['@pinia/nuxt', '@nuxt/eslint'],

  css: ['bootstrap/dist/css/bootstrap.css'],

  runtimeConfig: {
    public: {
      apiBase: 'https://dev.hsv.beer/api/v1/'
    }
  },

  app: {
    head: {
      title: 'HSV.beer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Find draft beer in Huntsville' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Montserrat:400,500|Oswald:500&display=swap'
        }
      ]
    }
  },

  nitro: {
    host: process.env.HOST || '0.0.0.0',
    port: Number(process.env.PORT) || 8000
  },

  devServer: {
    port: Number(process.env.PORT) || 8000
  }
})
