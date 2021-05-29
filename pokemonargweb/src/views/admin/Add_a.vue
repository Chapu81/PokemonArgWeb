<template>
<div class="d-flex justify-center align-center container-h">
    <v-card
		:elevation="3"
		width="500"
        height="460"
		class="rounded pa-4 ma-4"
    >
		<!-- height="280" -->
		<v-text-field
            label="Nombre"
            outlined
			v-model="data_card.name"
        ></v-text-field>
		
		<v-text-field
            label="Precio"
            outlined
			v-model="data_card.price"
        ></v-text-field>
		
        <v-select
            :items="language_select"
            v-model="data_card.language"
            label="Idioma"
            outlined
        ></v-select>
        
        <v-select
            :items="type_select"
            v-model="data_card.type"
            label="Tipo"
            outlined
        >
            <template v-slot:selection="{ item }">
                <v-img
                    alt="Pokeball"
                    class="shrink mr-2"
                    contain
                    :src="`/img/types/${item.img}.webp`"
                    transition="scale-transition"
                    width="30"
                />
                    <!-- :src="`../../assets/img/types/${item.img}.webp`" -->
                {{ item.text }}
            </template>
            <template v-slot:item="{ item }">
                <v-img
                    alt="Pokeball"
                    class="shrink mr-2"
                    contain
                    :src="`/img/types/${item.img}.webp`"
                    transition="scale-transition"
                    width="30"
                />
                    <!-- :src="`../../assets/img/types/${item.img}.webp`" -->
                {{ item.text }}
            </template>
        </v-select>

        <v-checkbox
            v-model="data_card.legendary"
            label="Legendaria"
        ></v-checkbox>

		<v-btn 
			block 
			color="error" 
			elevation="3" 
			:loading="loading"
            @click="validate"
		>
			Agregar
		</v-btn>
	</v-card>

    <snackbar-c :text="snackbar_text" @close="snackbar_text = ''" />
</div>
</template>

<script>
import db from '../../main'
import Snackbar from '../../components/Snackbar'
    export default {
        name: 'add',

        components: {
			'snackbar-c': Snackbar
		},

        data: () => ({
            loading: false,
            option_selected: '',
            snackbar_text: '',
            data_card: {
                img: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/3/37/latest/20141220171847/Bulbasaur_%28Crystal_Guardians_45_TCG%29.jpg/245px-Bulbasaur_%28Crystal_Guardians_45_TCG%29.jpg',
                name: '',
                price: '',
                language: '',
                type: '',
                legendary: false,
            }
        }),

        created() {
            this.option_selected = this.$route.params.opt;
        },

        methods: {
            validate() {
                this.loading = true;
                let {name, price, language, type} = this.data_card;
                if(name === '' || price === '' || language === '' || type === '') {
                    this.snackbar_text = 'Complete todos los campos';
                    this.loading = false;
                    return false;
                }
                this.add_card();
            },

            async add_card() {
                try {
                    await db.collection('cards').add(this.data_card);
                    this.snackbar_text = 'Datos cargados correctamente';
                    this.reset_data();
                    this.loading = false;
                }catch (error) {
                    this.snackbar_text = 'Ocurrió un error al cargar los datos';
                    this.loading = false;
                }
            },

            reset_data() {
                this.data_card = {
                    img: 'https://images.wikidexcdn.net/mwuploads/wikidex/thumb/3/37/latest/20141220171847/Bulbasaur_%28Crystal_Guardians_45_TCG%29.jpg/245px-Bulbasaur_%28Crystal_Guardians_45_TCG%29.jpg',
                    name: '',
                    price: '',
                    language: '',
                    type: '',
                    legendary: false,
                }
            }
        },

        computed: {
            language_select() {
                return [
                    'Alemán',
                    'Español',
                    'Francés',
                    'Holandés',
                    'Inglés',
                    'Italiano',
                    'Japonés',
                ];
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
.v-input--selection-controls {
    margin-top: 0;
    padding-top: 0;
}
</style>