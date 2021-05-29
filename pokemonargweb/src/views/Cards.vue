<template>
<div>
	<template v-for="card in cards">
		<card-c :card="card" :key="card.id" @card_delete="card_delete($event)" />	
	</template>

	<snackbar-c :text="snackbar_text" @close="snackbar_text = ''" />
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
	}),

	created() {
		this.get_cards();
	},

	methods: {
		async get_cards() {
			try {
				const snapshot = await db.collection('cards').get();
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
		},
		
		async add_card() {
			try {
				await db.collection('cards').add({
					img: 'Ejemplo2',
					name: 'Ejemplo 2',
					price: '215212',
					language: 'ingles',
				});

				this.get_cards();
			}catch (error) {
				console.log(error);
			}
		},
		
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
</style>