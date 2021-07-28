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
					icon
					plain
					v-bind="attrs"
					v-on="on"
				>
					<!-- Agregar nuevo -->
					<v-icon>mdi-account-plus</v-icon>
				</v-btn>
			</template>

			<v-card>
				<div class="pa-5 pb-0">
					<v-text-field
						id="input-user"
						v-model="new_user"
						label="Usuario (sin arroba @)"
						dense
						outlined
						@keypress.enter="validate"
					></v-text-field>
				</div>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						:loading="loading_modal"
						text
						@click="validate"
					>
						Agregar
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>

	<div class="d-flex justify-space-between align-center contain-totals">
		<p>Total usuarios: {{ discounts.length }}</p>
		<v-text-field
			v-model="search_user"
			class="filter-user"
			label="Buscar usuario"
			clearable
			dense
			outlined
		></v-text-field>
	</div>

	<div class="table-container">
		<v-simple-table fixed-header>
			<template v-slot:default>
				<thead>
					<tr>
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
						v-for="(item, key) in filter_discounts"
						:key="`${item.id}-${key}`"
					>
						<td>{{ item.user }}</td>
						<td class="delete text-right">
							<span>
								<v-btn
									icon
									plain
									:loading="btn_loading === item.id"
									@click="loading_and_delete(item.id)"
									:class="`delete-${item.id}`"
								>
									<v-icon>mdi-delete</v-icon>
								</v-btn>
							</span>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>

		<snackbar-c :text="text_snackbar" />

		<loader-c v-if="!loaded" />
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
		loaded: false,
		btn_loading: null,
		loading_modal: false,
		search_user: '',
	}),

	watch: {
		dialog() {
			this.dialog 
				? setTimeout(this.focus_input, 1)
				: this.new_user = '';
		}
	},

	created() {
		this.get_discounts();
	},

	methods: {
		async get_discounts() {
			try {
                await this.$store.dispatch('save_get_discounts');
				this.loaded = true;
			}catch (error) {
				console.log(error);
			}
		},
		
		async new_discounts() {
			try {
                await this.$store.dispatch('push_discounts', {user: this.new_user});
				this.set_snackbar('Usuario cargado correctamente');
				this.dialog = false;
			}catch (error) {
				console.log(error);
				this.set_snackbar('Error al cargar el usuario');
			}

			this.loading_modal = false;
		},
		
		async delete_discounts(id) {
			try {
                await this.$store.dispatch('delete', {data_db: 'discounts', id});
				this.set_snackbar('Usuario borrado correctamente');
				this.get_discounts();
				this.new_user = '';
			}catch (error) {
				console.log(error);
				this.set_snackbar('Error al borrar el usuario');
			}

			this.btn_loading = null;
		},

		loading_and_delete(id) {
			this.btn_loading = id;
			this.delete_discounts(id);
		},

		validate() {
			if(this.new_user !== '') {
				let repeat = this.discounts.filter(discount => discount.user === this.new_user);
				if(repeat.length === 0) {
					this.loading_modal = true;
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
		},

		focus_input() {
			let input = document.getElementById('input-user');
			input.focus();
		},
	},

	computed: {
		discounts() {
            return this.$store.getters.discounts.sort(function (a, b) {
				if (a.user > b.user) {
					return 1;
				}
				if (a.user < b.user) {
					return -1;
				}
				return 0;
			});
        },

		filter_discounts() {
			return this.discounts.filter(data => data.user.includes(this.search_user));
		}
	}
}
</script>

<style scoped>
.table-container {
	max-width: 400px;
	margin: 0 auto;
}

th.delete span {
	font-size: 0;
}

td.delete span{
	cursor: pointer;
}

.contain-totals {
	margin-bottom: -20px;
}

.contain-totals p {
	margin-bottom: 20px;
}

.filter-user {
	width: 50%;
	max-width: 150px;
}

@media screen and (min-width: 768px){
	.filter-user {
		max-width: 250px;
	}
}
</style>