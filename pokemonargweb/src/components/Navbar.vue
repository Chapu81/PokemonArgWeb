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

		<v-btn icon :x-small="mobile" v-if="!search_active" @click="set_search_active">
			<v-icon>mdi-magnify</v-icon>
		</v-btn>

		<div class="input-search" v-else>
			<v-text-field
				label=""
				placeholder="Nombre o tipo"
				outlined
				dense
				@focusout="search_active = false;"
			></v-text-field>
		</div>

		<template v-for="(section, key) in section_list">
			<v-btn 
				text 
				:key="key"
				:small="mobile"
				:to="section.link"
				class="buttons-sections"
				v-show="view_buttons"
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
			search_active: false
        }),

        methods: {
			go_to_page(page) {
				if(this.$route.fullPath != page) {
					this.$router.push(page)
				}
			},

			set_search_active(){
				this.search_active = true;
				setTimeout(() => {
					let input = document.querySelector('.input-search input');
					if(input) {
						input.focus();
					}
				}, 1);
			}
        },

        computed: {
			mobile() {
				return this.$store.getters.mobile;
			},

			view_buttons() {
				if(this.mobile && this.search_active) {
					return false;
				}

				return true;
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
.input-search {
	width: 180px;
	height: 40px;
	margin-right: 8px;
}

@media screen and (max-width: 600px){
	.buttons-sections {
		padding: 0 8px!important;
	}
}
</style>