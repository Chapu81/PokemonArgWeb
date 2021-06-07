<template>
<div class="d-flex justify-center align-center container-h">
    <v-card
		:elevation="3"
		width="500"
        height="530"
		class="rounded pa-4 ma-4"
    >
		<!-- height="280" -->
		<v-text-field
            label="Nombre"
            dense
            outlined
			v-model="data_card.name"
        ></v-text-field>
		
		<v-text-field
            label="Precio"
            dense
            min="1"
            type="number"
            outlined
			v-model="data_card.price"
        ></v-text-field>
		
        <v-text-field
            label="Cantidad"
            dense
            min="1"
            type="number"
            outlined
			v-model="data_card.stock"
        ></v-text-field>
		
        <v-select
            :items="language_select"
            v-model="data_card.language"
            label="Idioma"
            dense
            outlined
        ></v-select>
        
        <v-select
            :items="type_select"
            v-model="data_card.type"
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
                    <!-- :src="`../../assets/img/types/${item.img}.webp`" -->
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
                    <!-- :src="`../../assets/img/types/${item.img}.webp`" -->
                {{ item.text }}
            </template>
        </v-select>

        <v-file-input
            label="Frente"
            dense
            v-model="file_front"
            prepend-icon=""
            outlined
            @change="img_to_base64('front')"
        ></v-file-input>
        
        <v-file-input
            label="Reverso"
            dense
            v-model="file_back"
            prepend-icon=""
            outlined
            @change="img_to_base64('back')"
        ></v-file-input>

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
        name: 'addcard',

        components: {
			'snackbar-c': Snackbar
		},

        data: () => ({
            loading: false,
            snackbar_text: '',
            file_front: [],
            file_back: [],

            data_card: {
                front: '',
                back: '',
                name: '',
                price: '',
                stock: 1,
                language: '',
                type: '',
            }
        }),

        methods: {
            validate() {
                this.loading = true;

                let {name, price, language, type, front, back, stock} = this.data_card;

                if(name === '' || price === '' || !parseInt(stock) || language === '' || type === '' || front.length === 0 || back.length === 0) {
                    this.snackbar_text = 'Complete todos los campos';
                    this.loading = false;
                    return false;
                }

                if(parseInt(stock) < 1 || parseFloat(price) < 1) {
                    this.snackbar_text = 'La cantidad y el precio no pueden ser menor a 1';
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
                    name: '',
                    front: '',
                    back: '',
                    price: '',
                    stock: '',
                    language: '',
                    type: '',
                }
                this.file_front = [];
                this.file_back = [];
            },

            img_to_base64(front_or_back) {
                var file = front_or_back === 'front' ? this.file_front : this.file_back;
                var reader  = new FileReader();

                var data_card = this.data_card;
                reader.onloadend = function () {
                    if(front_or_back === 'front') {
                        data_card.front = reader.result;
                    }else {
                        data_card.back = reader.result;
                    }
                }

                reader.readAsDataURL(file);
            }
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