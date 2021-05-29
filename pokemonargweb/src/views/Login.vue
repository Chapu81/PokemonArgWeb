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
        ></v-text-field>
		
		<v-text-field
            label="Contraseña"
            outlined
			v-model="password"
        ></v-text-field>

		<v-btn 
			block 
			color="error" 
			elevation="3" 
			:loading="loading"
			@click="login"
		>
			Ingresar
		</v-btn>
	</v-card>

	<v-snackbar
        v-model="snackbar"
        :timeout="timeout"
    >
        {{ snackbar_text }}

        <template v-slot:action="{ attrs }">
            <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbar = false"
            >
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</div>
</template>

<script>
import Snackbar from '../components/Snackbar'
	export default {
		name: 'login',

		components: {
			'snackbar-c': Snackbar,
		},

		data: () => ({
			loading: false,
			email: '',
			password: '',

			snackbar: false,
            snackbar_text: '',
            timeout: 2000,
		}),

		methods: {
			login() {
				this.loading = true;
				if(this.email === '' || this.password === '') {
					this.snackbar_text = 'Todos los campos son obligatorios';
					this.snackbar = true;
					this.loading = false;
				}
			}
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