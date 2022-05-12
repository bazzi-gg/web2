import { NuxtRuntimeConfig } from '@nuxt/types/config/runtime'
import { accessorType } from './store/index'
import { StrapiWrapper } from './plugins/strapi'
import { ApiWrapper } from '~/plugins/api'
import { StatApiWrapper } from '~/plugins/statapi'
declare module 'vue/types/vue' {
  interface Vue {
    $accessor: typeof accessorType
    $api: ApiWrapper
    $config: NuxtRuntimeConfig
    $strapi: StrapiWrapper
    $statapi: StatApiWrapper
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
