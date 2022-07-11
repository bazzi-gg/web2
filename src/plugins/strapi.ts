import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Plugin } from '@nuxt/types'
import { Autocomplete } from '../types/autocomplete'
import { PlayerDetail } from '../types/player-detail.ts'
import { AvailableChannels } from '../types/available-channels'
import { Contributor } from '../types/contributor'
class StrapiWrapper {
  private readonly axios: NuxtAxiosInstance
  constructor(axiosInstance: NuxtAxiosInstance) {
    this.axios = axiosInstance
  }

  async getAvailableChannels(): Promise<AvailableChannels> {
    const res = (await this.axios.$get(
      '/available-channels'
    )) as AvailableChannels
    return res
  }

  async getContributors(): Promise<Contributor[]> {
    const res = (await this.axios.$get('/contributors')) as Contributor[]
    return res
  }
}
const strapi: Plugin = ({ $axios, $config }, inject) => {
  const axios: NuxtAxiosInstance = $axios.create({
    baseURL: $config.strapiUrl,
  })
  axios.onRequest((config) => {
    delete config.headers.Authorization
    return config
  })
  inject('strapi', new StrapiWrapper(axios))
}
export default strapi
export { StrapiWrapper }
