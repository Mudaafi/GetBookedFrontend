import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import googleapi, { State as googleapiState } from './modules/googleapi'

export type State = {
  googleapi: googleapiState
}

Vue.use(Vuex)

const options: StoreOptions<State> = {
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    googleapi,
  },
  plugins: [
    createPersistedState({
      paths: ['googleapi'],
    }),
  ],
}

export default new Vuex.Store(options)
