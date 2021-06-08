<template>
<div class="container">
	<v-card
		:elevation="3"
		height="280"
		width="350"
		class="rounded padding-card"
    >
		<v-text-field
            label="Email"
            outlined
			v-model="email"
			@keyup.enter="validate"
        ></v-text-field>
		
		<v-text-field
            label="Contraseña"
			:type="show_password ? 'text' : 'password'"
			:append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            outlined
			v-model="password"
			@keyup.enter="validate"
			@click:append="show_password = !show_password"
        ></v-text-field>

		<v-btn 
			block 
			:color="$store.getters.color_app" 
			elevation="3" 
			:loading="loading"
			@click="validate"
		>
			Ingresar
		</v-btn>
	</v-card>

	<snackbar-c :text="snackbar_text" @close="snackbar_text = ''" />
</div>
</template>

<script>
import Snackbar from '../components/Snackbar'
	export default {
		name: 'login',

		components: {
			'snackbar-c': Snackbar
		},

		data: () => ({
			loading: false,
			email: '',
			password: '',
			// email: 'pokemonarg.web@gmail.com',
			// password: 'Pokemonarg1981',

			show_password: false,
            snackbar_text: '',
		}),

		methods: {
			validate() {
				this.loading = true;
				if(this.email === '' || this.password === '') {
					this.snackbar_text = 'Todos los campos son obligatorios';
					this.loading = false;
				}else {
					this.login();
				}
			},
			login() {
				this.$store.getters.firebase.auth().signInWithEmailAndPassword(this.email, this.password)
					.then((userCredential) => {
						this.email = '';
						this.password = '';
						this.loading = false;
						this.$router.push('/cartas');
					})
					.catch((error) => {
						switch('' + error.code + '') {
							case 'auth/invalid-email': 
							case 'auth/user-not-found': 
							case 'auth/wrong-password': 
								this.snackbar_text = 'El email o la contraseña son incorrectos';
								break;
							default: {
								this.snackbar_text = 'Ocurrió un error, intente nuevamente';
							}
						}
						this.loading = false;
					})
			},
		}
	}
</script>

<style scoped>
.container {
	width: 100%;
	height: calc(100vh - 100px);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 25px;
}

.padding-card {
	padding: 25px;
	padding-top: 35px;
}
</style>