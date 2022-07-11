import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime'
import Vue, { ComponentOptions } from 'vue'
import { MetaInfo } from 'vue-meta'
import { accessorType } from './src/store/index'
import { StrapiWrapper } from './src/plugins/strapi'
import { ApiWrapper } from '~/src/plugins/api'
import { StatApiWrapper } from '~/src/plugins/statapi'
import { SEO } from '~/src/plugins/seo'
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    head?: MetaInfo | (() => MetaInfo)
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
    $api: ApiWrapper
    $config: NuxtRuntimeConfig
    $strapi: StrapiWrapper
    $statapi: StatApiWrapper
    $seo: typeof SEO
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $accessor: typeof accessorType
    $api: ApiWrapper
    $config: NuxtRuntimeConfig
    $strapi: StrapiWrapper
    $statapi: StatApiWrapper
  }

  interface Context {
    $accessor: typeof accessorType
    $api: ApiWrapper
    $config: NuxtRuntimeConfig
    $strapi: StrapiWrapper
    $statapi: StatApiWrapper
  }
}
declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  interface Store<S> {
    $api: ApiWrapper
    $config: NuxtRuntimeConfig
    $strapi: StrapiWrapper
    $statapi: StatApiWrapper
  }
}
