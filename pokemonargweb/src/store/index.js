import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logued_user: false,
    firebase: null,
    mobile: false,
    shopping_cart: [],
    count_shopping_cart: 0,
    color_app: 'error',
  },
  mutations: {
    log_state (state, user) {
      state.logued_user = user
    },
    
    set_firebase (state, value) {
      state.firebase = value
    },
    
    set_mobile (state, bool) {
      state.mobile = bool
    },
    
    set_count_shopping_cart (state, {action, amount, card}) {
      state.count_shopping_cart = action
                          ? state.count_shopping_cart + amount
                          : state.count_shopping_cart - amount;
      state.shopping_cart.push(card);
    },
    
    empty_count_shopping_cart (state) {
      state.count_shopping_cart = 0;
      state.shopping_cart = [];
    },
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
    
    mobile: state => {
      return state.mobile;
    },
    
    count_shopping_cart: state => {
      return state.count_shopping_cart;
    },
    
    shopping_cart: state => {
      return state.shopping_cart;
    },
    
    color_app: state => {
      return state.color_app;
    },
  }
})
