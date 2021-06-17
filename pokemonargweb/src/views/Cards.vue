<template>
<div>
	<div class="d-md-flex justify-center justify-md-start align-center flex-wrap pa-4 container-cards hidden-load" >
		<template v-for="card in cards">
			<card-c 
				:card="card" 
				:key="card.id" 
				@card_delete="card_delete($event)" 
				@card_loaded="card_loaded++" />	
		</template>

		<snackbar-c :text="snackbar_text" @close="snackbar_text = ''" />
	</div>
	<v-progress-circular
		:size="70"
		:width="7"
		color="red"
		indeterminate
		class="spinner"
		v-if="!loaded"
    ></v-progress-circular>
</div>
</template>

<script>
import db from '../main'
import Card from '../components/Card'
import Snackbar from '../components/Snackbar'

export default {
	name: 'cards',
	
	components: {
		'card-c': Card,
		'snackbar-c': Snackbar,
    },

	data: () => ({
		cards: [],
		snackbar_text: '',
		card_loaded: 0,
		loaded: false,
	}),

	watch: {
		card_loaded() {
			if(this.card_loaded > 0 && !this.loaded) {
				this.loaded = true
			}
		}
	},

	created() {
		this.get_cards();
	},

	methods: {
		async get_cards() {
			try {
				this.cards = await this.$store.dispatch('save_get_cards', 1623894714000);
			}catch (error) {
				console.log(error);
			}
		},
		
		/* async get_cards() {
			try {
				const snapshot = await db.collection('cards').orderBy('date').get();
				this.cards = [];
				snapshot.forEach(doc => {
					let data = {
						id: doc.id,
						...doc.data()
					};
					// data.id = doc.id;
					this.cards.push(data);
				});
			}catch (error) {
				console.log(error);
			}
		}, */
		
		async update_card(id) {
			try {
				await db.collection('cards').doc(id).update({
					name: 'Ejemplo Editado',
					price: '5156161651651',
					language: 'editado',
				});

				this.get_cards();
			}catch (error) {
				console.log(error);
			}
		},

		card_delete(state) {
			if(state) {
				this.get_cards();
				this.snackbar_text = 'La carta se eliminó correctamente';
			}else {
				this.snackbar_text = 'Ocurrió un error al eliminar la carta';
			}
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

.spinner {
	position: absolute;
	top: calc(50vh - 80px);
	left: calc(50vw - 35px);
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