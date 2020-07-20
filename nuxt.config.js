import colors from 'vuetify/es5/util/colors'

export default {
  router: {
    mode: 'history'
  },
  server: {
    port: 3000, // par défaut: 3000
    host: '0.0.0.0' // par défaut: localhost
  },
  mode: 'spa',
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: 'World Pandemic Research Network',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poiret+One'
      },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '57x57',
        href: '/apple-icon-57x57.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '60x60',
        href: '/apple-icon-60x60.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        href: '/apple-icon-72x72.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '76x76',
        href: '/apple-icon-76x76.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '114x114',
        href: '/apple-icon-114x114.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '120x120',
        href: '/apple-icon-120x120.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        href: '/apple-icon-144x144.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '152x152',
        href: '/apple-icon-152x152.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-icon-180x180.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: '/android-icon-192x192.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/favicon-96x96.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png'
      },
      { rel: 'manifest', href: '/manifest.json' }
    ],
    script: []
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#2196f3' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~plugins/filters',
    '~plugins/amplify',
    '~/plugins/jsonld',
    /*   { src: '~plugins/ga.js', mode: 'client' }, */
    { src: '~/plugins/polyfills', mode: 'client' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/vuetify'], /* , '@nuxtjs/google-analytics' */
  /* googleAnalytics: {
    id: 'UA-162015115-1'
    /*    dev: false,
       debug: {
         enabled: true,
         sendHitTask: true
       }
  }, */
  sitemap: {
    hostname: 'https://wprn.org',
    gzip: true,
    exclude: []
  },
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/recaptcha', '@nuxtjs/sitemap'],
  recaptcha: {
    /* reCAPTCHA options */
    hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
    siteKey: '6Lc_xuUUAAAAALwowUq0cC0wFtFnZ2NCi3UH4i1j', // Site key for requests
    version: 2, // Version
    size: 'invisible'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue,
          accent: colors.grey.darken3,
          secondary: colors.blue.lighten3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    extend (config, ctx) {
      // ESLint when saving
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
