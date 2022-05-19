import pkg from './package.json'
const isDevelopment: boolean = process.env.NODE_ENV === 'development'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'web',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api.ts',
    '~/plugins/vuex-persistedstate.js',
    '~/plugins/vue-typed.client.js',
    '~/plugins/strapi.ts',
    '~/plugins/apexcharts.client.js',
    '~/plugins/statapi.ts',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: ['~/components', '~/components/rider', '~/components/stat'],

  publicRuntimeConfig: {
    metadataUrl: process.env.APP_METADATA_URL,
    strapiUrl: process.env.APP_STRAPI_URL,
  },
  privateRuntimeConfig: {
    apiKey: process.env.APP_API_KEY,
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    'nuxt-typed-vuex',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    ['nuxt-buefy', { defaultIconPack: '' }],
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/dayjs',
    '@nuxtjs/sentry',
  ],
  sentry: {
    config: {
      release: pkg.version,
    },
  },
  dayjs: {
    locales: ['en', 'ko'],
    defaultLocale: 'ko',
    defaultTimeZone: 'Asia/Seoul',
    plugins: ['duration', 'relativeTime', 'timezone', 'utc', 'isToday'],
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
    debug: isDevelopment,
  },
  proxy: {
    '/api/': {
      target: process.env.APP_API_SERVER_URL,
      pathRewrite: { '^/api/': '' },
    },
    '/statapi/': {
      target: process.env.APP_STATISTICS_SERVER_URL,
      pathRewrite: { '^/statapi/': '' },
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      vue: {
        compiler: require('vue-template-babel-compiler'),
      },
    },
  },
}
