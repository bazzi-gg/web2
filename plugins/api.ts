import type { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Plugin } from '@nuxt/types'
import { Autocomplete } from '~/types/autocomplete'
import { PlayerDetail } from '~/types/player-detail.ts'
import { Influencer } from '~/types/influencer'
type Dayjs = typeof import('dayjs')
class ApiWrapper {
  private readonly axios: NuxtAxiosInstance
  private readonly dayjs: Dayjs
  constructor(axiosInstance: NuxtAxiosInstance, dayjs: Dayjs) {
    this.axios = axiosInstance
    this.dayjs = dayjs
  }

  async getToken(apiKey: string): Promise<string> {
    const res = await this.axios.$post('/api/token', {
      key: apiKey,
    })
    return res
  }

  async getAutocomplete(keyword: string): Promise<Autocomplete[]> {
    return (await this.axios.$get(
      `/api/autocomplete?keyword=${keyword}`
    )) as Autocomplete[]
  }

  async getPlayerDetail(
    nickname: string,
    channel: string
  ): Promise<PlayerDetail> {
    const data: PlayerDetail = await this.axios.$get(
      `/api/player?nickname=${nickname}&channel=${channel}`
    )
    this.updatePlayerData(data)
    return data
  }

  async refreshPlayerDetail(
    nickname: string,
    channel: string
  ): Promise<PlayerDetail | null> {
    const data: ''|PlayerDetail = await this.axios.$post('/api/player', {
      Nickname: nickname,
      channel,
    })
    if(data === ''){
      return null
    }
    console.log(data)
    this.updatePlayerData(data)
    return data
  }

  async getMatchDetail(matchId: string, myAccessId: string): Promise<any> {
    const data = await this.axios.$get(
      `/api/match/detail?matchId=${matchId}&accessId=${myAccessId}`
    )
    return data
  }

  async getMoreMatch(
    accessId: string,
    startMatchId: string,
    channel: string
  ): Promise<any> {
    const data = await this.axios.$get(
      `/api/match/more-matches?accessId=${accessId}&startMatchId=${startMatchId}&channel=${channel}`
    )
    return data
  }

  async getInfluencerList(): Promise<Influencer[]> {
    const data = await this.axios.$get('/api/influencer')
    return data
  }

  private updatePlayerData(data: PlayerDetail): void {
    // 오브젝트가 아니면 200, 201 등 정상적인 반환이 아님
    if (typeof data !== 'object') {
      return
    }
    data.lastRenewalRaw = data.lastRenewal
    const lastRenewal = this.dayjs(data.lastRenewal)
    if (lastRenewal.year() === 1901) {
      data.lastRenewal = '조회 기록 없음'
    } else if (this.dayjs().isSame(lastRenewal, 'second')) {
      data.lastRenewal = '방금'
    } else {
      data.lastRenewal = this.dayjs
        .duration(
          lastRenewal.diff(this.dayjs().tz().format('YYYY-MM-DD HH:mm:ss'))
        )
        .humanize(true)
    }
  }
}
const api: Plugin = ({ $axios, $config, store, $dayjs }, inject) => {
  const axios: NuxtAxiosInstance = $axios.create()
  axios.onRequest((config) => {
    // check if the user is authenticated
    if (store.state.auth.token) {
      // set the Authorization header using the access token
      config.headers.Authorization = 'Bearer ' + store.state.auth.token
    }
    return config
  })
  inject('api', new ApiWrapper(axios, $dayjs))
}
export default api
export { ApiWrapper }
