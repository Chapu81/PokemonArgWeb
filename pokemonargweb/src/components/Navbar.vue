<template>
    <v-app-bar app color="error" dark>
		<div class="d-flex align-center">
			<v-img
				alt="Pokeball"
				class="shrink mr-2"
				contain
				src="../assets/img/logo/pokeball.png"
				transition="scale-transition"
				width="40"
			/>
		</div>

		<v-btn text @click="go_to_page('/')">
			<span class="mr-2">Pokemon Arg</span>
		</v-btn>

		<v-spacer v-if="logued"></v-spacer>
		<v-menu offset-y v-if="logued">
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					text
					v-bind="attrs"
					v-on="on"
				>
					<i class="material-icons">person</i>
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

</style>