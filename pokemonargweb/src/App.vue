<template>
<v-app>
	<h1 class="title-page">Cartas Pokemon Arg</h1>
	<navbar-c></navbar-c>
    <v-main>
		<router-view />
    </v-main>

	<user-c />
	<cart-c />
</v-app>
</template>

<script>
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import User from './components/User'
export default {
	name: "App",
	components: {
		'navbar-c': Navbar,
		'cart-c': Cart,
		'user-c': User,
	},

	beforeMount() {
		let mql = window.matchMedia('(max-width: 600px)');
		mql.addListener(this.screenTest);
		let mobile = window.innerWidth > 600 ? false : true; 
		this.$store.commit('set_mobile', mobile);
	},

	methods: {
		screenTest(e) {
			this.$store.commit('set_mobile', e.matches);
		},
	},
};
</script>

<style scoped>
	
</style>
