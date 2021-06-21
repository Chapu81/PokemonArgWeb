<template>
<div class="d-flex justify-center align-center container-h">
    <v-card
		:elevation="3"
		width="500"
		class="rounded pa-4 ma-4"
    >
        <h2>Agregar {{database === 'cards' ? 'cartas' : 'mazos'}}</h2>

		<v-text-field
            label="Nombre"
            dense
            outlined
			v-model="data_product.name"
        ></v-text-field>
		
		<v-text-field
            label="Precio"
            dense
            min="1"
            type="number"
            outlined
			v-model="data_product.price"
        ></v-text-field>
		
        <v-text-field
            label="Cantidad"
            dense
            min="1"
            type="number"
            outlined
			v-model="data_product.stock"
        ></v-text-field>
		
        <v-select
            :items="language_select"
            v-model="data_product.language"
            label="Idioma"
            dense
            outlined
        ></v-select>
        
        <v-select
            v-if="is_cards"
            :items="type_select"
            v-model="data_product.type"
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

        <v-textarea
            outlined
            dense
            v-model="data_product.description"
            v-if="!is_cards"
            label="Descripción"
        ></v-textarea>

        <v-file-input
            label="Imagenes"
            dense
            multiple
            v-model="imgs"
            prepend-icon=""
            outlined
            @change="set_base64"
        ></v-file-input>

		<v-btn 
			block 
			:color="$store.getters.color_app" 
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
import Snackbar from '../../components/Snackbar.vue'

    export default {
        name: 'adddata',

        components: {
			'snackbar-c': Snackbar
		},

        data: () => ({
            loading: false,
            snackbar_text: '',
            imgs: [],

            data_product: {
                imgs: [],
                name: '',
                price: '',
                stock: 1,
                language: '',
                date: null,
            }
        }),

        watch: {
            database() {
                this.reset_data();
            }
        },

        created() {
            if(this.is_cards) {
                this.data_product.type = '';
            }else {
                this.data_product.description = '';
            }
        },

        methods: {
            validate() {
                this.loading = true;

                let {name, price, language, stock, imgs} = this.data_product;
                
                if(name === '' || price === '' || !parseInt(stock) || language === '' || imgs.length === 0) {
                    this.snackbar_text = 'Complete todos los campos';
                    this.loading = false;
                    return false;
                }

                if(this.is_cards) {
                    if(this.data_product.type === '' ) {
                        this.snackbar_text = 'Complete todos los campos';
                        this.loading = false;
                        return false;
                    }
                }else {
                    if(this.data_product.description === '' ) {
                        this.snackbar_text = 'Complete todos los campos';
                        this.loading = false;
                        return false;
                    }
                }

                if(parseInt(stock) < 1 || parseFloat(price) < 1) {
                    this.snackbar_text = 'La cantidad y el precio no pueden ser menor a 1';
                    this.loading = false;
                    return false;
                }

                const date = new Date();
                this.data_product.date = Date.parse(date);
                this.add_db();
            },

            
            async add_db() {
                try {
                    let data = {...this.data_product};
                    data.filters = data.name.toLowerCase().split(' ');
                    data.filters.push(data.language.toLowerCase());
                    if(data.type) {
                        data.filters.push(data.type.toLowerCase());
                    }

                    await db.collection(this.database).add(data);
                    this.snackbar_text = 'Datos cargados correctamente';
                    this.reset_data();
                    this.loading = false;
                }catch (error) {
                    console.log(error);
                    this.snackbar_text = 'Ocurrió un error al cargar los datos';
                    this.loading = false;
                }
            },

            reset_data() {
                this.data_product = {
                    name: '',
                    imgs: [],
                    price: '',
                    stock: 1,
                    language: '',
                    date: null,
                }

                if(this.is_cards) {
                    this.data_product.type = '';
                }else {
                    this.data_product.description = '';
                }

                this.imgs = [];
            },

            img_to_base64(file) {
                var reader  = new FileReader();

                var data_product = this.data_product
                reader.onloadend = function () {
                    data_product.imgs.push(reader.result);
                }

                reader.readAsDataURL(file);
            },


            set_base64() {
                this.data_product.imgs = [];
                this.imgs.forEach(file => {
                    this.img_to_base64(file);
                });
            }
        },

        computed: {
            database() {
                return this.$route.params.opt === 'cartas' ? 'cards' : 'decks';
            }, 

            language_select() {
                return [
                    'Inglés',
                    'Español',
                    'Coreano',
                    'Japonés',
                    'Portugués',
                    'Alemán',
                    'Francés',
                    'Holandés',
                    'Italiano',
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

            is_cards() {
                return this.database === 'cards';
            }
        }
    }
</script>

<style scoped>
.v-input--selection-controls {
    margin-top: 0;
    padding-top: 0;
}

h2 {
    text-align: center;
    margin-bottom: 5px;
}

</style>