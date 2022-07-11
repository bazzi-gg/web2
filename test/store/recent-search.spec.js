import { createLocalVue } from '@vue/test-utils'
import Vuex, { Store } from 'vuex'
import { useAccessor } from 'typed-vuex'
import { state, mutations, actions } from '~/src/store/index'
import * as recentSearch from '~/src/store/recentSearch'
const localVue = createLocalVue()
localVue.use(Vuex)

const pattern = {
  state,
  mutations,
  actions,
  modules: {
    recentSearch,
  },
}

const store = new Store(pattern)
const accessor = useAccessor(store, pattern)

// Trick to use accessor within actions
store.app = {
  $accessor: accessor,
}
describe('[Vuex store] recent search test', () => {
  test('초기 배열 길이 0', () => {
    expect(store.app.$accessor.recentSearch.get).toHaveLength(0)
  })
  test('데이터 추가', () => {
    store.app.$accessor.recentSearch.add('1')
    store.app.$accessor.recentSearch.add('2')
    store.app.$accessor.recentSearch.add('3')
    expect(store.app.$accessor.recentSearch.get).toStrictEqual(['3', '2', '1'])
  })
  test('배열 길이 6 이상 불가능', () => {
    store.app.$accessor.recentSearch.add('1')
    store.app.$accessor.recentSearch.add('2')
    store.app.$accessor.recentSearch.add('3')
    store.app.$accessor.recentSearch.add('4')
    store.app.$accessor.recentSearch.add('5')
    store.app.$accessor.recentSearch.add('6')
    store.app.$accessor.recentSearch.add('7')
    expect(store.app.$accessor.recentSearch.get).toHaveLength(6)
  })
  test('특정 요소 삭제', () => {
    store.app.$accessor.recentSearch.removeNickname('5')
    store.app.$accessor.recentSearch.removeNickname('3')
    expect(store.app.$accessor.recentSearch.get).toStrictEqual([
      '7',
      '6',
      '4',
      '2',
    ])
  })
  test('모두 삭제', () => {
    store.app.$accessor.recentSearch.removeNickname('7')
    store.app.$accessor.recentSearch.removeNickname('6')
    store.app.$accessor.recentSearch.removeNickname('4')
    store.app.$accessor.recentSearch.removeNickname('2')
    expect(store.app.$accessor.recentSearch.get).toHaveLength(0)
  })
})
