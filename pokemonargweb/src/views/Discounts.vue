<template>
<div class="container">
	<div class="d-flex justify-space-between align-center">
		<h2>Usuarios con descuento</h2>
		<v-dialog
			v-model="dialog"
			width="500"
		>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					text
					plain
					v-bind="attrs"
					v-on="on"
				>
					Agregar nuevo
				</v-btn>
			</template>

			<v-card>
				<div class="pa-5 pb-0">
					<v-text-field
						v-model="new_user"
						label="Usuario (sin arroba @)"
						dense
						outlined
					></v-text-field>
				</div>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="primary"
						text
						@click="validate"
					>
						Agregar
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>

	<div class="table-container">
		<v-simple-table fixed-header>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-left">
							ID
						</th>
						<th class="text-left">
							Nombre
						</th>
						<th class="delete">
							<span>Borrar</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="(item, key) in discounts"
						:key="`${item.id}-${key}`"
					>
						<td>{{ item.id }}</td>
						<td>{{ item.user }}</td>
						<td class="delete">
							<span>
								<v-icon @click="delete_discounts(item.id)">mdi-delete</v-icon>
							</span>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>

		<snackbar-c :text="text_snackbar" />
	</div>
</div>
</template>

<script>
export default {
	name: 'Discounts',
	data: () => ({
		dialog: false,
		new_user: '',
		text_snackbar: '',
	}),

	created() {
		this.get_discounts();
	},

	methods: {
		async get_discounts() {
			try {
                await this.$store.dispatch('save_get_discounts');
			}catch (error) {
				console.log(error);
			}
		},
		
		async new_discounts() {
			try {
                await this.$store.dispatch('push_discounts', {user: this.new_user});
				this.set_snackbar('Usuario cargado correctamente');
			}catch (error) {
				console.log(error);
				this.set_snackbar('Error al cargar el usuario');
			}

			this.dialog = false;
		},
		
		async delete_discounts(id) {
			try {
                await this.$store.dispatch('delete', {data_db: 'discounts', id});
				this.set_snackbar('Usuario borrado correctamente');
				this.get_discounts();
			}catch (error) {
				console.log(error);
				this.set_snackbar('Error al borrar el usuario');
			}
		},

		validate() {
			if(this.new_user !== '') {
				let repeat = this.discounts.indexOf(this.new_user);
				console.log(repeat);
				if(repeat === -1) {
					this.new_discounts();
				}else {
					this.set_snackbar('El usuario ya se encuentra registrado');
				}
			}else {
				this.set_snackbar('El usuario no puede estar vacío');
			}
		},

		set_snackbar(text) {
			this.text_snackbar = text;
			setTimeout(() => this.text_snackbar = '', 2100);
		}
	},

	computed: {
		discounts() {
            return this.$store.getters.discounts;
        },
	}
}
</script>

<style scoped>
.table-container {
	max-width: 500px;
	margin: 0 auto;
}

th.delete span {
	font-size: 0;
}

td.delete span{
	cursor: pointer;
}
</style>