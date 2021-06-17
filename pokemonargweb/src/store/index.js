import Vue from "vue";
import Vuex from "vuex";
import db from '../main'

Vue.use(Vuex);

export default new Vuex.Store({
state: {
    logued_user: false,
    firebase: null,
    mobile: false,
    shopping_cart: [],
    count_shopping_cart: 0,
    color_app: "error",
	cards_pages: [],
	cards_active: [],
},
mutations: {
    log_state(state, user) {
		state.logued_user = user;
    },

    set_firebase(state, value) {
		state.firebase = value;
    },

    set_mobile(state, bool) {
		state.mobile = bool;
    },
    
	set_cards_pages(state, arr) {
		state.cards_pages.push(arr);
    },
	
	set_cards_active(state, arr) {
		state.cards_active = arr;
    },

    set_count_shopping_cart(state, { action, amount, card }) {
		state.count_shopping_cart = action
			? state.count_shopping_cart + amount
			: state.count_shopping_cart - amount;
		this.commit("set_shopping_cart", { card });
    },

    set_shopping_cart(state, { id, amount, card }) {
		if (card) {
			let position = state.shopping_cart.findIndex((el) => el.id === card.id);
			if (position == -1) {
				state.shopping_cart.push(card);
			} else {
				state.shopping_cart[position].amount += card.amount;
			}
		} else {
			let position = state.shopping_cart.findIndex((el) => el.id === id);
			let dif = amount - state.shopping_cart[position].amount;
			state.shopping_cart[position].amount = amount;
			state.count_shopping_cart += dif;
		}
    },

    delete_card_shopping_cart(state, id) {
		let position = state.shopping_cart.findIndex((el) => el.id === id);
		let card_deleted = state.shopping_cart.splice(position, 1);
		state.count_shopping_cart -= card_deleted[0].amount;
    },

    empty_count_shopping_cart(state) {
		state.count_shopping_cart = 0;
		state.shopping_cart = [];
    },
},

actions: {
	async save_get_cards({ commit }, last) {
		try {
			const call_db = db.collection('cards').orderBy('date').limit(1);
			const snapshot = !last 
							? await call_db.get() 
							: await call_db.startAfter(last).get();
			var cards = [];
			snapshot.forEach(doc => {
				let data = {
					id: doc.id,
					...doc.data()
				};
				cards.push(data);
			});
			
			commit('set_cards_active', cards);
			return cards;

		}catch (error) {
			console.log(error);
		}
	},
},

modules: {},

getters: {
    logued: (state) => {
		return state.logued_user;
    },

    firebase: (state) => {
		return state.firebase;
    },

    mobile: (state) => {
		return state.mobile;
    },

    count_shopping_cart: (state) => {
		return state.count_shopping_cart;
    },

    shopping_cart: (state) => {
		return state.shopping_cart;
    },

    shopping_cart_id: (state) => (id) => {
		return state.shopping_cart.find((card) => card.id === id);
    },

    color_app: (state) => {
		return state.color_app;
    },
    
	cards_active: (state) => {
		return state.cards_active;
    },
},
});
