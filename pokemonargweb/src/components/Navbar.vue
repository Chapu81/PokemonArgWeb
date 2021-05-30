<template>
    <v-app-bar app color="error" dark>
		<!-- <div class="d-flex align-center">
			<v-img
				alt="Pokeball"
				class="shrink mr-2"
				contain
				src="../assets/img/logo/logo.png"
				transition="scale-transition"
				width="50"
			/>
		</div> -->
		<router-link to="/" class="d-flex justify-center align-center btn-logo">
			<v-img
				alt="Pokeball"
				class="shrink mr-2"
				contain
				src="../assets/img/logo/logo.png"
				transition="scale-transition"
				width="50"
			/>

			<span class="mr-2 d-none d-sm-inline">Cartas Pokemon Arg</span>
		</router-link>
		<!-- <v-btn text @click="go_to_page('/')" class="d-flex justify-center align-center btn-logo">
			<v-img
				alt="Pokeball"
				class="shrink mr-2"
				contain
				src="../assets/img/logo/logo.png"
				transition="scale-transition"
				width="50"
			/>

			<span class="mr-2 d-none d-sm-inline">Pokemon Arg</span>
		</v-btn> -->

		<v-spacer></v-spacer>

		<v-btn icon>
			<v-icon>mdi-magnify</v-icon>
		</v-btn>

		<v-menu offset-y v-if="logued">
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					icon
					v-bind="attrs"
					v-on="on"
				>
					<v-icon>mdi-dots-vertical</v-icon>
				</v-btn>
			</template>
			<v-list class="pointer">
				<!-- <v-list-item @click="$router.push('/inicio-admin')"> -->
				<v-list-item @click="go_to_page('/inicio-admin')">
					<v-list-item-title>Admin</v-list-item-title>
				</v-list-item>
				<v-list-item @click="logout">
					<v-list-item-title>Cerrar sesión</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
    </v-app-bar>
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
</style>