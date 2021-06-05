<template>
<div>
    <v-app-bar
		color="error"
		dense
		fixed
		dark
    >
		<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

		<v-toolbar-title class="title-nav pl-0 subtitle-1">Cartas Pokemon Arg</v-toolbar-title>
		<v-toolbar-title class="title-nav pl-0">Cartas Pokemon Arg</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-btn icon>
			<v-icon>mdi-magnify</v-icon>
		</v-btn>
		<!-- <v-btn icon>
			<v-icon>mdi-cart</v-icon>
		</v-btn> -->
		<v-btn icon>
			<v-badge
				:content="count_shopping_cart"
				:value="count_shopping_cart"
				color="blue"
				overlap
			>
			
				<v-icon>mdi-cart</v-icon>
			</v-badge>
		</v-btn>
    </v-app-bar>

	<v-navigation-drawer
		v-model="drawer"
		fixed
		temporary
    >

		<v-list-item>
			<v-list-item-content height="175">
				<v-img
					alt="Pokeball"
					class="shrink mx-auto"
					contain
					src="../assets/img/logo/logo.png"
					transition="scale-transition"
					max-width="150"
				/>
			</v-list-item-content>
		</v-list-item>

		<v-divider></v-divider>

		<v-list
			nav
			dense
		>
			<v-list-item-group v-model="group">
				<template v-for="(section, key) in section_list">
					<v-list-item :key="key">
						<v-list-item-title class="ml-4 subtitle-2" @click="go_to_page(section.link)">
							{{section.text}}
						</v-list-item-title>
					</v-list-item>
				</template>

				<v-list-item v-if="logued">
					<v-list-item-title class="ml-4 subtitle-2" @click="logout">
						Cerrar sesión
					</v-list-item-title>
				</v-list-item>
			</v-list-item-group>
		</v-list>
    </v-navigation-drawer>
</div>
</template>

<script>
    export default {
        name: 'navbar',

		data: () => ({
			drawer: false,
			group: null,
		}),

        methods: {
			go_to_page(page) {
				console.log(this.$route.fullPath);
				if(this.$route.fullPath != page) {
					this.$router.push(page)
				}
			},

            logout() {
                this.$store.getters.firebase.auth().signOut().then(() => {
                    this.go_to_page('/login-admin');
                }).catch((error) => {
                    console.log(error);
                });
            },
        },

        computed: {
            logued() {
                return this.$store.getters.logued;
            },
            
			count_shopping_cart() {
                return this.$store.getters.count_shopping_cart;
            },

			section_list() {
				let res = [
					{
						text: 'Inicio',
						link: '/'
					},
					{
						text: 'Cartas',
						link: '/cartas'
					},
				];

				if(this.logued) {
					res.push({
						text: 'Admin',
						link: '/inicio-admin'
					});
				}

				return res;
			}
        }
    }
</script>

<style scoped>
.btn-logo {
	color: white;
	text-transform: uppercase;
	text-decoration: none;
	font-size: 16px;
	font-weight: bold;
}

.title-nav.subtitle-1 {
	display: none;
}

/* .bg-red {
	min-height: 175px;
} */

@media screen and (max-width: 600px){
	.title-nav {
		display: none;
	}
	.title-nav.subtitle-1 {
		display: inline;
	}
}
</style>