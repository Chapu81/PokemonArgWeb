<template>
<div>
	<h1>This is an about page</h1>
	<button @click="add_card">Push data</button>

	<ul>
		<template v-for="card in cards">
			<li :key="card.id">
				<!-- <img :src="card.img" :alt="card.name"> -->
				<p>{{card.name}} <span @click="delete_card(card.id)">X</span></p>
				<button @click="update_card(card.id)">Modificar</button>
				<span>{{card.price}}</span>
				<span>{{card.language}}</span>
			</li>
		</template>
	</ul>

	<button @click="logout">Logout</button>
	<button @click="login">Login</button>

</div>
</template>

<script>
import firebase from 'firebase'
import db from '../main'
export default {
	name: 'about',

	data: () => ({
		cards: [],
		email: 'pokemonarg.web@gmail.com',
		password: 'Pokemonarg1981',
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
		
		async delete_card(id) {
			try {
				await db.collection('cards').doc(id).delete();

				this.get_cards();
			}catch (error) {
				console.log(error);
			}
		},

		logout() {
			firebase.auth().signOut().then(() => {
				console.log('Logout ok!');
			}).catch((error) => {
				console.log(error);
			});
		},

		login() {
			firebase.auth().signInWithEmailAndPassword(this.email, this.password)
				.then((userCredential) => {
					// var user = userCredential.user;
					console.log(userCredential.user);
					console.log(userCredential.user.email);
					console.log(userCredential.user.uid);
				})
				.catch((error) => {
					console.log('code: ' + error.code);
					console.log('message: ' + error.message);
				})
		},
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