import {
  getAccessorType,
  actionTree,
  getterTree,
  mutationTree,
} from 'typed-vuex'
// Import all your submodules
import { Context } from '@nuxt/types'
import * as recentSearch from './recentSearch'
import * as auth from './auth'
export const state = () => ({})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {})

export const actions = actionTree(
  { state, getters, mutations },
  {
    async nuxtServerInit(_vuexContext, nuxtContext: Context): Promise<void> {
      await nuxtContext.$accessor.auth.login()
    },
  }
)

// This compiles to nothing and only serves to return the correct type of the accessor
export const accessorType = getAccessorType({
  getters,
  mutations,
  state,
  actions,
  modules: {
    // The key (submodule) needs to match the Nuxt namespace (e.g. ~/store/submodule.ts)
    recentSearch,
    auth,
  },
})
