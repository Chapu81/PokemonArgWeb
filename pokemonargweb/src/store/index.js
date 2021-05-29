import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logued_user: false,
    firebase: null,
  },
  mutations: {
    log_state (state, user) {
      state.logued_user = user
    },
    
    set_firebase (state, value) {
      state.firebase = value
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    logued: state => {
      return state.logued_user;
    },
    
    firebase: state => {
      return state.firebase;
    },
  }
})
