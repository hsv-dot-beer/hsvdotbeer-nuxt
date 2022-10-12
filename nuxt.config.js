export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'HSV.beer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#f5bd00' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-webfontloader'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'https://dev.hsv.beer/api/v1/'
  },
  bootstrapVue: {
    componentPlugins: ['LayoutPlugin', 'ImagePlugin', 'CollapsePlugin', 'LinkPlugin', 'ModalPlugin']
  },
  webfontloader: {
    custom: {
      families: ['Montserrat:n4,n5', 'Oswald:n5'],
      urls: [
        'https://fonts.googleapis.com/css?family=Montserrat:400,500&display=swap',
        'https://fonts.googleapis.com/css?family=Oswald:500&display=swap'
      ]
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    /*
     ** You can extend webpack config here
     */
    extractCSS: true,
    extend (config, ctx) {}
  }
}
