<template>
<v-app>
	<h1 class="title-page">Cartas Pokemon Arg</h1>
	<navbar-c></navbar-c>
    <v-main>
		<router-view />
    </v-main>
</v-app>
</template>

<script>
import Navbar from './components/Navbar'
export default {
	name: "App",
	components: {
		'navbar-c': Navbar,
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
	.v-main {
		padding-top: 45px!important;
	}

	@media screen and (min-width: 1440px) {
		.v-main {
			width: 1440px;
			margin: 0 auto;
		}
	}
</style>
