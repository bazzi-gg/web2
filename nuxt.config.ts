import pkg from './package.json'
const isDevelopment: boolean = process.env.NODE_ENV === 'development'
const titleTemplate = (chunk: string) => `${chunk} | BAZZI.GG`
const defaultTitle = '카트라이더 전적 검색'
const defaultDescription =
  '카트라이더 아이템 전, 스피드 전 전적을 확인해보세요.'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'ko',
    },
    titleTemplate,
    title: defaultTitle,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'idth=device-width, initial-scale=1, viewport-fit=cover',
      },
      {
        property: 'og:title',
        content: defaultTitle,
        template: titleTemplate,
        hid: 'og:title',
      },
      {
        hid: 'description',
        name: 'description',
        content: defaultDescription,
      },
      {
        property: 'og:description',
        content: defaultDescription,
        hid: 'og:description',
      },
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:site_name', content: 'BAZZI.GG' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:image',
        content: '/cover.png',
      },
      { property: 'og:image:alt', content: 'BAZZI.GG Logo' },
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
    '~/plugins/seo.ts',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: ['~/components', '~/components/rider', '~/components/stat'],

  publicRuntimeConfig: {
    metadataUrl: process.env.APP_METADATA_URL,
    strapiUrl: process.env.APP_STRAPI_URL,
    gtm: {
      id: process.env.APP_GOOGLE_TAG_MANAGER_ID,
    },
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
    '@nuxtjs/gtm',
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    sitemaps: [
      {
        path: "/sitemap.xml",
      },
    ],
  },
  gtm: {
    enable: !isDevelopment,
  },
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
    extractCSS: {
      ignoreOrder: true,
    },
    loaders: {
      vue: {
        compiler: require('vue-template-babel-compiler'),
      },
    },
  },
}
