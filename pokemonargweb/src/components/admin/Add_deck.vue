<template>
<div class="d-flex justify-center align-center container-h">
    <v-card
		:elevation="3"
		width="500"
		class="rounded pa-4 ma-4"
    >
		<!-- height="280" -->
		<v-text-field
            label="Nombre"
            dense
            outlined
			v-model="data_deck.name"
        ></v-text-field>
		
		<v-text-field
            label="Precio"
            dense
            min="1"
            type="number"
            outlined
			v-model="data_deck.price"
        ></v-text-field>
		
        <v-text-field
            label="Cantidad"
            dense
            min="1"
            type="number"
            outlined
			v-model="data_deck.stock"
        ></v-text-field>
		
        <v-select
            :items="language_select"
            v-model="data_deck.language"
            label="Idioma"
            dense
            outlined
        ></v-select>

        <v-textarea
            outlined
            v-model="data_deck.description"
            label="Descripción"
        ></v-textarea>

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
import Snackbar from '../Snackbar.vue'
    export default {
        name: 'adddeck',

        components: {
			'snackbar-c': Snackbar
		},

        data: () => ({
            loading: false,
            snackbar_text: '',
            files: [],

            data_deck: {
                name: '',
                price: '',
                stock: 1,
                language: '',
                description: '',
            }
        }),

        methods: {
            validate() {
                this.loading = true;

                let {name, price, language, description, stock} = this.data_deck;

                if(name === '' || price === '' || !parseInt(stock) || language === '' || description === '') {
                    this.snackbar_text = 'Complete todos los campos';
                    this.loading = false;
                    return false;
                }

                if(parseInt(stock) < 1 || parseFloat(price) < 1) {
                    this.snackbar_text = 'La cantidad y el precio no pueden ser menor a 1';
                    this.loading = false;
                    return false;
                }
                this.add_deck();
            },

            async add_deck() {
                try {
                    await db.collection('decks').add(this.data_deck);
                    this.snackbar_text = 'Datos cargados correctamente';
                    this.reset_data();
                    this.loading = false;
                }catch (error) {
                    this.snackbar_text = 'Ocurrió un error al cargar los datos';
                    this.loading = false;
                }
            },

            reset_data() {
                this.data_deck = {
                    name: '',
                    price: '',
                    stock: '',
                    language: '',
                    description: '',
                }
                this.files = [];
            },

            /* img_to_base64(front_or_back) {
                var file = front_or_back === 'front' ? this.file_front : this.file_back;
                var reader  = new FileReader();

                var data_deck = this.data_deck;
                reader.onloadend = function () {
                    if(front_or_back === 'front') {
                        data_deck.front = reader.result;
                    }else {
                        data_deck.back = reader.result;
                    }
                }

                reader.readAsDataURL(file);
            } */
        },

        computed: {
            language_select() {
                return [
                    'Alemán',
                    'Coreano',
                    'Español',
                    'Francés',
                    'Holandés',
                    'Inglés',
                    'Italiano',
                    'Japonés',
                    'Portugués',
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