import { mutationTree, actionTree } from 'typed-vuex'

export const namespaced = true

export const state = () => ({
  token: '',
})

export const mutations = mutationTree(state, {
  setToken(state, token: string) {
    state.token = token
  },
})

export const actions = actionTree(
  { state, mutations },
  {
    async login({ commit }) {
      const res = await this.$api.getToken(this.$config.apiKey)
      commit('setToken', res)
    },
  }
)
