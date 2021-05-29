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

	data: () => ({
		
	}),
};
</script>
