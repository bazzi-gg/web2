import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Plugin } from '@nuxt/types'
import { StatisticsResponse, Ranking } from '../types/stat'
class StatApiWrapper {
  private readonly axios: NuxtAxiosInstance
  constructor(axiosInstance: NuxtAxiosInstance) {
    this.axios = axiosInstance
  }

  async getKartbody(
    date: string,
    type: 'speed-kartbody' | 'item-kartbody'
  ): Promise<StatisticsResponse<Ranking>> {
    const res = await this.axios.$get(
      `/statapi/statistics/${type}?date=${date}`
    )
    return res
  }

  async getTrack(
    date: string,
    type: 'speed-track' | 'item-track'
  ): Promise<StatisticsResponse<Ranking>> {
    const res = await this.axios.$get(
      `/statapi/statistics/${type}?date=${date}`
    )
    return res
  }

  async getMatch(date: string): Promise<StatisticsResponse<any>> {
    const res = await this.axios.$get(`/statapi/statistics/match?date=${date}`)
    return res
  }
}
const statapi: Plugin = ({ $axios, store }, inject) => {
  const axios: NuxtAxiosInstance = $axios.create()
  axios.onRequest((config) => {
    // check if the user is authenticated
    if (store.state.auth.token) {
      // set the Authorization header using the access token
      config.headers.Authorization = 'Bearer ' + store.state.auth.token
    }
    return config
  })
  inject('statapi', new StatApiWrapper(axios))
}
export default statapi
export { StatApiWrapper }
