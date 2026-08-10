const googleAnalyticsId = process.env.NUXT_PUBLIC_GA_ID || 'G-9N8HXBGZD9'

export default defineNuxtConfig({
  compatibilityDate: '2024-08-01',

  modules: ['@pinia/nuxt', '@nuxt/eslint'],

  css: ['bootstrap/dist/css/bootstrap.css'],

  runtimeConfig: {
    public: {
      apiBase: 'https://dev.hsv.beer/api/v1/',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://hsv-beer.fly.dev',
      googleAnalyticsId
    }
  },

  app: {
    head: {
      title: 'HSV.beer',
      htmlAttrs: {
        lang: 'en'
      },
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
          href: 'https://fonts.googleapis.com/css?family=Montserrat:400,500|Oswald:500&display=optional'
        }
      ],
      script: [
        {
          innerHTML: '(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})()',
          tagPosition: 'head'
        },
        ...(process.env.NODE_ENV === 'production'
          ? [
              {
                src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
                async: true,
                tagPosition: 'head' as const
              },
              {
                innerHTML: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${googleAnalyticsId}');`,
                tagPosition: 'head' as const
              }
            ]
          : [])
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
