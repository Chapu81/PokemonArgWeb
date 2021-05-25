<template>
<div>
	<h1>This is an about page</h1>
	<button @click="push_card">Push data</button>
</div>
</template>

<script>
import db from '../main'
export default {
	name: 'about',

	data: () => ({

	}),

	mounted() {
		this.get_cards();
	},

	methods: {
		async get_cards() {
			try {
				const snapshot = await db.collection('cards').get();
				// const cards = [];
				snapshot.forEach(doc => {
					console.log(doc.data());
				});
			}catch (error) {
				console.log(error);
			}
		},
		
		async push_card() {
			try {
				await db.collection('cards').add({
					img: 'po',
					name: 'lala ',
					price: '215212',
					language: 'ingles',
				});

				this.get_cards();
			}catch (error) {
				console.log(error);
			}
		}
	}
}
</script>

<style scoped>

</style>