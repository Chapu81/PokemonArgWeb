<template>
<div>
	<div v-if="no_data && loaded" class="no-data">
		<p>No se encontraron resultados</p>
	</div>


	<div class="d-md-flex justify-center justify-md-start align-center flex-wrap pa-4 pb-0 container-cards hidden-load" >
		<template v-for="card in cards">
			<card-c 
				:card="card" 
				:key="card.id" 
				@card_delete="card_delete($event)" 
				@card_loaded="card_loaded++" />	
		</template>

		<snackbar-c :text="snackbar_text" @close="snackbar_text = ''" />
	</div>

	<div class="d-flex justify-space-around align-center pb-5" v-if="loaded">
		<v-btn
			:color="$store.getters.color_app" 
			text
			@click="back"
			:disabled="this.card_page === 1"
		>
		Anterior
		</v-btn>

		<v-btn
			:color="$store.getters.color_app" 
			text
			@click="next"
			:disabled="this.cards.length < this.total_card_list"
		>
		Siguiente
		</v-btn>
	</div>

	<loader-c v-if="!loaded" />
</div>
</template>

<script>
import Card from '../components/Card'

export default {
	name: 'cards',
	
	components: {
		'card-c': Card,
    },

	data: () => ({
		cards: [],
		snackbar_text: '',
		card_loaded: 0,
		loaded: false,
		last_card: null,
		card_page: 1,
		cards_save:[],
	}),

	watch: {
		card_loaded() {
			if(this.card_loaded > 0 && !this.loaded) {
				this.loaded = true
			}
		},

		cards() {
			let length = this.cards.length;
			if(length === this.total_card_list) {
				if(this.cards[length - 1].date !== this.last_card)  {
					this.last_card = this.cards[length - 1].date;
				}
			}else {
				this.last_card = null;
			}
		},

		params() {
			this.cards_save = [];
			this.cards = [];
			console.log('cambio params');
			this.get_cards();
		}
	},

	created() {
		if(this.cards_pages.length && !this.params) {
			this.cards = [...this.cards_pages[0]];
			this.cards_save = [...this.cards_pages];
		}else {
			this.get_cards();
		}
	},

	methods: {
		async get_cards() {
			try {
				this.cards = this.params 
						? await this.$store.dispatch('get_cards_params', this.params.toLowerCase().split(' '), this.last_card)
						: await this.$store.dispatch('save_get_cards', this.last_card);

				if(this.cards.length) {
					this.cards_save.push(this.cards);
				}

				if(!this.cards.length && !this.cards_save.length) {
					this.loaded = true;
				}

			}catch (error) {
				console.log(error);
			}
		},

		next() {
			if(this.cards.length === this.total_card_list) {
				this.card_page++;

				this.card_page <= this.cards_save.length 
						? this.set_cards(this.card_page - 1)
						: this.get_cards();
			}
		},

		back() {
			if(this.card_page > 1) {
				this.card_page--;
				this.set_cards(this.card_page - 1);
			}
		},

		set_cards(id) {
			this.cards = [...this.cards_save[id]];
		},

		card_delete(state) {
			if(state) {
				this.snackbar_text = 'La carta se eliminó correctamente';
				window.location.reload();
			}else {
				this.snackbar_text = 'Ocurrió un error al eliminar la carta';
			}
		}
	},

	computed: {
		total_card_list() {
			return 3;
		},

		cards_pages() {
            return this.$store.getters.cards_pages;
        },

		params() {
			return this.$route.params.card ? this.$route.params.card : null;
		},

		no_data() {
			return this.cards.length === 0;
		}
	}
}
</script>

<style scoped>
p {
	margin: 0;
}
li {
	margin: 15px;
}

.container-cards {
	max-width: 400px;
	margin: 0 auto;
}

.no-data {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 60vh;
	font-weight: bold;
	font-size: 18px;
}

@media screen and (min-width: 960px) {
	.container-cards {
		max-width: 800px;
	}
}

@media screen and (min-width: 1200px) {
	.container-cards {
		max-width: 1160px;
	}
}

@media screen and (min-width: 1530px) {
	.container-cards {
		max-width: 1530px;
	}
}
</style>