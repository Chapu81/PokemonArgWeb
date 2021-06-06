<template>
<div class="text-center">
    <v-dialog
		v-model="dialog"
		width="500"
    >
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				icon
				:loading="loading"
				v-bind="attrs"
				v-on="on"
				title="Borrar"
				class="mr-5"
			>
				<v-icon>mdi-delete</v-icon>
			</v-btn>
		</template>

		<v-card>
			<v-card-title class="subtitle-1 lighten-2">
				¿Seguro que quiere borrar esta carta?
			</v-card-title>

			<v-divider></v-divider>

			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					text
					small
					@click="dialog = false"
				>
					Cancelar
				</v-btn>
				<v-btn
					text
					small
					@click="delete_card"
				>
					Borrar
				</v-btn>
			</v-card-actions>
		</v-card>
    </v-dialog>
</div>
</template>

<script>
    export default {
        name: 'deleteItem',

        data: () => ({
			dialog: false,
			loading: false
        }),

		methods: {
			delete_card() {
				this.$emit('delete_card');
				this.dialog = false;
				this.loading = true;
			}
		}
    }
</script>

<style scoped>

</style>