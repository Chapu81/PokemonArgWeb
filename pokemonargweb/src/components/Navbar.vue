<template>
<div>
    <v-app-bar
		:color="$store.getters.color_app"
		dark
    >
		<v-toolbar-title 
			class="pl-0 pointer" 
			@click="go_to_page('/')"
		>
			<v-img
				alt="Cartas Pokemon Arg"
				contain
				src="../assets/img/logo/logo.png"
				max-width="55"
				class="d-md-none"
			/>
			
			<v-img
				alt="Cartas Pokemon Arg"
				contain
				src="../assets/img/logo/logo.png"
				max-width="65"
				class="d-none d-md-block"
			/>
		</v-toolbar-title>
		
		<v-toolbar-title></v-toolbar-title>


		<v-spacer></v-spacer>

		<v-btn icon :x-small="mobile">
			<v-icon>mdi-magnify</v-icon>
		</v-btn>

		<template v-for="(section, key) in section_list">
			<v-btn 
				text 
				:key="key"
				:small="mobile"
				:to="section.link"
				class="buttons-sections"
			>
				{{section.text}}
			</v-btn>
		</template>
    </v-app-bar>
</div>
</template>

<script>
    export default {
        name: 'navbar',

        methods: {
			go_to_page(page) {
				if(this.$route.fullPath != page) {
					this.$router.push(page)
				}
			},
        },

        computed: {
			mobile() {
				return this.$store.getters.mobile;
			},

			section_list() {
				let res = [
					{
						text: 'Cartas',
						link: '/cartas'
					},
					{
						text: 'Mazos',
						link: '/mazos'
					},
				];

				return res;
			}
        }
    }
</script>

<style scoped>
@media screen and (max-width: 600px){
	.buttons-sections {
		padding: 0 8px!important;
	}
}
</style>