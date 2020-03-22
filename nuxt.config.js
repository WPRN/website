import colors from 'vuetify/es5/util/colors'
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/website/'
  }
} : {}
export default {
  ...routerBase,
  server: {
    port: 3000, // par défaut: 3000
    host: '0.0.0.0', // par défaut: localhost
  },
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: 'World Pandemic Research Network',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "apple-touch-icon", sizes: "57x57", href: "/apple-icon-57x57.png" },
      { rel: "apple-touch-icon", sizes: "60x60", href: "/apple-icon-60x60.png" },
      { rel: "apple-touch-icon", sizes: "72x72", href: "/apple-icon-72x72.png" },
      { rel: "apple-touch-icon", sizes: "76x76", href: "/apple-icon-76x76.png" },
      { rel: "apple-touch-icon", sizes: "114x114", href: "/apple-icon-114x114.png" },
      { rel: "apple-touch-icon", sizes: "120x120", href: "/apple-icon-120x120.png" },
      { rel: "apple-touch-icon", sizes: "144x144", href: "/apple-icon-144x144.png" },
      { rel: "apple-touch-icon", sizes: "152x152", href: "/apple-icon-152x152.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-icon-180x180.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/android-icon-192x192.png" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
      { rel: "icon", type: "image/png", sizes: "96x96", href: "/favicon-96x96.png" },
      { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
      { rel: "manifest", href: "/manifest.json" }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/timeago',
    '~plugins/filters.js',
    {
      src: '~plugins/amplify.js',
      ssr: false
    }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/recaptcha',
    '@nuxtjs/apollo',

  ],
  recaptcha: {
    /* reCAPTCHA options */
    hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
    siteKey: "6Ldjy- IUAAAAAOjIjm1DrJXemRFrfvAuxSlGuJ2m",    // Site key for requests
    version: 3,     // Version
  },
  // Give apollo module options
  apollo: {
    tokenName: 'bearer', // optional, default: apollo-token
    cookieAttributes: {
      /**
        * Define when the cookie will be removed. Value can be a Number
        * which will be interpreted as days from time of creation or a
        * Date instance. If omitted, the cookie becomes a session cookie.
        */
      expires: 7, // optional, default: 7 (days)

      /**
        * Define the path where the cookie is available. Defaults to '/'
        */
      path: '/' // optional
    },
    /**
      * Define the domain where the cookie is available. Defaults to
      * the domain of the page where the cookie was created.
      */
    //domain: 'example.com', // optional

    /**
      * A Boolean indicating if the cookie transmission requires a
      * secure protocol (https). Defaults to false.
      */
    // secure: false,
    // },
    //includeNodeModules: true, // optional, default: false (this includes graphql-tag for node_modules folder)
    //authenticationType: 'ASTR', // optional, default: 'Bearer'
    // (Optional) Default 'apollo' definition
    defaultOptions: {
      // See 'apollo' definition
      // For example: default query options
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'all',
      },
    },
    // optional
    //watchLoading: '~/plugins/apollo-watch-loading-handler.js',
    // optional
    // errorHandler: '~/apollo/customErrorHandler.js',
    // required

    clientConfigs: {
      default: {
        // required
        httpEndpoint: process.env.BACKEND_URL || "http://192.168.0.17:4000/graphql"
        // optional
        // override HTTP endpoint in browser only
        //browserHttpEndpoint: '/graphql',
        // optional
        // See https://www.apollographql.com/docs/link/links/http.html#options
        /*  httpLinkOptions: {
           credentials: 'same-origin'
         }, */
        // You can use `wss` for secure connection (recommended in production)
        // Use `null` to disable subscriptions
        //wsEndpoint: 'ws://localhost:4000', // optional
        // LocalStorage token
        //tokenName: 'apollo-token', // optional
        // Enable Automatic Query persisting with Apollo Engine
        //persisting: false, // Optional
        // Use websockets for everything (no HTTP)
        // You need to pass a `wsEndpoint` for this to work
        //websocketsOnly: false // Optional
      },
      /* test: {
        httpEndpoint: 'http://localhost:5000',
        wsEndpoint: 'ws://localhost:5000',
        tokenName: 'apollo-token'
      }, */
      // alternative: user path to config which returns exact same config options
      //test2: '~/plugins/my-alternative-apollo-config.js'
    }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
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
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
