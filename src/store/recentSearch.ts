import { getterTree, mutationTree, actionTree } from 'typed-vuex'

export const namespaced = true

export const state = () => ({
  nicknames: [] as string[],
})

export const getters = getterTree(state, {
  get: (state) => state.nicknames,
})

export const mutations = mutationTree(state, {
  addNickname(state, nickname: string) {
    state.nicknames.unshift(nickname)
  },
  removeNickname(state, nickname: string): boolean {
    const idx = state.nicknames.findIndex((node) => node === nickname)
    if (idx === -1) {
      return false
    }
    state.nicknames.splice(idx, 1)
    return true
  },
  popNickname(state) {
    if (state.nicknames.length < 6) {
      return
    }
    state.nicknames.pop()
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    add({ commit }, nickname: string) {
      if (!commit('removeNickname', nickname)) {
        commit('popNickname')
      }
      commit('addNickname', nickname)
    },
  }
)
