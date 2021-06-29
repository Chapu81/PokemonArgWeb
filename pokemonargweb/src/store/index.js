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
	orders: [],
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

	set_orders(state, orders) {
		state.orders = orders;
    },
},

actions: {
	async save_get_cards({ commit }, last) {
		try {
			const call_db = db.collection('cards').orderBy('date', 'desc').limit(3);
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
			
			commit('set_cards_pages', cards);
			return cards;

		}catch (error) {
			console.log(error);
		}
	},
	
	async get_cards_params({ commit }, params, last) {
		try {
			const call_db = db.collection('cards').where('filters', 'array-contains-any', params).limit(3);
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

			return cards;

		}catch (error) {
			console.log(error);
		}
	},

	async push_order({ dispatch }, data) {
		try {
			await db.collection('orders').add(data);

			data.shopping_cart.forEach(order => {
				let data = {
					data_db: order.description ? 'decks' : 'cards',
					id: order.id,
					new_stock: order.amount - order.amount - order.amount,
				}
				if(order.amount === order.stock || order.stock === 1) {
					dispatch('delete', data);
				}else {
					dispatch('update', data);
				}
			});

			return true;

		}catch (error) {
			console.log(error);
			return false;
		}
	},

	async delete({ dispatch }, { data_db, id}) {
		try {
			await db.collection(data_db).doc(id).delete();
			return true

		}catch (error) {
			console.log(error);
			return false;
		}
	},
	
	async update({ dispatch }, { data_db, id, new_stock}) {
		try {
			let element = await db.collection(data_db).doc(id).get();
			let stock = element.data().stock;
			await db.collection(data_db).doc(id).update({
				stock: stock + new_stock
			});
			return true

		}catch (error) {
			console.log(error);
			return false;
		}
	},
	
	async confirm_order({ dispatch }, id) {
		try {
			await db.collection('orders').doc(id).delete();
			return true;

		}catch (error) {
			console.log(error);
			return false;
		}
	},
	
	async reject_order({ dispatch }, {id, data_card}) {
		try {
			await db.collection('orders').doc(id).delete();

			data_card.forEach(card => {
				let data = {
					data_db: card.description ? 'decks' : 'cards',
					id: card.id,
					new_stock: card.amount,
				}
				dispatch('update', data);
			});

			return true;

		}catch (error) {
			console.log(error);
			return false;
		}
	},

	async save_get_orders({ commit }) {
		try {
			const snapshot = await db.collection('orders').get();
			var orders = [];
			snapshot.forEach(doc => {
				let data = {
					id: doc.id,
					...doc.data()
				};
				orders.push(data);
			});
			
			commit('set_orders', orders);
			return orders;

		}catch (error) {
			console.log(error);
			return []
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
    
	cards_pages: (state) => {
		return state.cards_pages;
    },
	
	orders: (state) => {
		return state.orders;
    },
},
});
