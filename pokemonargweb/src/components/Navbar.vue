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

		<!-- <v-btn icon :x-small="mobile">
			<v-icon>mdi-magnify</v-icon>
		</v-btn> -->

		<v-dialog
			v-model="dialog"
			max-width="600px"
		>
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon :x-small="mobile" v-bind="attrs" v-on="on">
					<v-icon>mdi-magnify</v-icon>
				</v-btn>
			</template>
			<v-card>
				<v-card-text class="pa-4">
					<v-text-field
						label="Nombre de la carta"
						dense
						outlined
					></v-text-field>

					<v-select
						:items="type_select"
						label="Tipo"
						dense
						outlined
					>
						<template v-slot:selection="{ item }">
							<v-img
								:alt="item.text"
								class="shrink mr-2"
								contain
								:src="`/img/types/${item.img}.webp`"
								transition="scale-transition"
								width="20"
							/>
							{{ item.text }}
						</template>
						<template v-slot:item="{ item }">
							<v-img
								:alt="item.text"
								class="shrink mr-2"
								contain
								:src="`/img/types/${item.img}.webp`"
								transition="scale-transition"
								width="20"
							/>
							{{ item.text }}
						</template>
					</v-select>


				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						color="blue darken-1"
						text
						@click="dialog = false"
					>
						Buscar
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

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
		
		data: () => ({
			dialog: false,
        }),

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
			},

			type_select() {
                return [
                    {
                        text: 'Incoloro',
                        img: 'colorless',
                    },
                    {
                        text: 'Oscuridad',
                        img: 'darkness',
                    },
                    {
                        text: 'Dragón',
                        img: 'dragon',
                    },
                    {
                        text: 'Hada',
                        img: 'fairy',
                    },
                    {
                        text: 'Lucha',
                        img: 'fighting',
                    },
                    {
                        text: 'Fuego',
                        img: 'fire',
                    },
                    {
                        text: 'Hierba',
                        img: 'grass',
                    },
                    {
                        text: 'Relámpago',
                        img: 'lightning',
                    },
                    {
                        text: 'Metal',
                        img: 'metal',
                    },
                    {
                        text: 'Psíquico',
                        img: 'psychic',
                    },
                    {
                        text: 'Agua',
                        img: 'water',
                    },
                ];
            },
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