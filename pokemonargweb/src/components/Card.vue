<template>
<v-card
    class="my-10 mx-3"
    max-width="350"
>
    <v-dialog max-width="800">
        <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on" @click="active_carousel">
                <v-carousel show-arrows-on-hover height="250" hide-delimiters>
                    <v-carousel-item
                        v-for="(item,i) in [card.front, card.back]"
                        :key="i"
                        :src="item"
                        @load="emit_loaded"
                    ></v-carousel-item>
                </v-carousel>
            </div>
        </template>
        <!-- <template v-slot:default="dialog"> -->
        <template>
            <v-card>
                <v-card-text class="pa-0">
                    <div>
                        <v-carousel hide-delimiters max-width="800">
                            <v-carousel-item
                                v-for="(item,i) in carousel_modal"
                                :key="i"
                                :src="item"
                            ></v-carousel-item>
                        </v-carousel>
                    </div>
                </v-card-text>
            </v-card>
        </template>
    </v-dialog>


    <v-card-title class="pb-0">{{card.name}}</v-card-title>

    <v-card-text class="pb-0">
        <div class="subtitle-1 d-flex justify-space-between align-center">
            <span class="title">
                $ {{card.price}}
            </span>
            <span class="d-flex justify-center align-center">
                Tipo: 
                <v-img
                    :alt="card.type"
                    class="shrink ml-2"
                    contain
                    :src="`/img/types/${types[card.type]}.webp`"
                    transition="scale-transition"
                    width="20"
                />
            </span>
        </div>

        <div class="d-flex justify-space-between align-center mt-1">
            <span>
                Legendaria:
                {{is_legendary}}
            </span>
            <div class="cantidad">
                <v-btn
                    depressed
                    icon
                    x-small
                    @click="edit_count('minus')"
                >
                    <v-icon small>
                        mdi-minus
                    </v-icon>
                </v-btn>

                <v-tooltip
                    v-model="state_tooltip_input"
                    top
                >
                <template v-slot:activator="{ attrs }">
                    <input type="number" 
                            v-bind="attrs"
                            value="0" 
                            class="rounded" 
                            v-model="count" 
                            @input="validate_max_count" 
                            @focusout="validate_min_count" >
                </template>
                    <span>Máximo disponible</span>
                </v-tooltip>


                <v-btn
                    depressed
                    icon
                    x-small
                    @click="edit_count('plus')"
                >
                    <v-icon small>
                        mdi-plus
                    </v-icon>
                </v-btn>
            </div>
        </div>
    </v-card-text>

    <v-card-actions class="d-flex justify-center align-center">
        <v-btn
            :color="btn_active ? 'success' :'error'"
            depressed
            elevation="2"
            class="push-btn"
            @click="push_shop"
        >
            <span v-if="!btn_active">
                Agregar al carrito
            </span>
            <v-icon v-else>
                mdi-check
            </v-icon>
        </v-btn>
    </v-card-actions>
</v-card>
</template>

<script>
import db from '../main'
    export default {
        name: 'Card',

        props: ['card'],

        data: () => ({
            snackbar_text: '',
            view_carousel: false,
            img_loaded: 0,
            btn_active: false,
            count: 1,
            state_tooltip_input: false,
        }),

        methods: {
            emit_loaded() {
                this.img_loaded++;
                if(this.img_loaded === 1) {
                    this.$emit('card_loaded');
                }
            },

            active_carousel() {
                setTimeout(() => {
                    this.view_carousel = true;
                }, 0);
            },

            async delete_card() {
                try {
                    await db.collection('cards').doc(this.card.id).delete();
                    this.$emit('card_delete', true);

                }catch (error) {
                    this.$emit('card_delete', false);
                    console.log(error);
                }
            },

            push_shop() {
                if(!this.btn_active) {
                    this.btn_active = true;
                    let data = {
                        amount: this.count, 
                        action: true,
                        card: {
                            ...this.card,
                            amount: this.count
                        }
                    };
                    this.$store.commit('set_count_shopping_cart', data);

                    setTimeout(() => {
                        this.btn_active = false;
                    }, 1000);
                }
            },

            validate_max_count() {
                if(this.count > 10) {
                    this.count = 10;
                    this.show_tooltip_input();
                }
            },
            
            validate_min_count() {
                if(this.count < 1) {
                    this.count = 1;
                }
            },

            show_tooltip_input() {
                this.state_tooltip_input = true;
                setTimeout(() => {
                    this.state_tooltip_input = false;
                }, 1000);
            },

            edit_count(action) {
                if(action === 'plus') {
                    if(this.count < 10) {
                        this.count++;
                    }else {
                        this.show_tooltip_input();
                    }
                }else {
                    if(this.count > 1) {
                        this.count--;
                    }
                }
            }
        },

        computed: {
            carousel_modal() {
                return this.view_carousel ? [this.card.front, this.card.back] : [];
            },

            logued() {
                return this.$store.getters.logued;
            },

            types() {
                return {
                    Incoloro: 'colorless',
                    Oscuridad: 'darkness',
                    Dragón: 'dragon',
                    Hada: 'fairy',
                    Lucha: 'fighting',
                    Fuego: 'fire',
                    Hierba: 'grass',
                    Relámpago: 'lightning',
                    Metal: 'metal',
                    Psíquico: 'psychic',
                    Agua: 'water',
                }
            },

            is_legendary() {
                return this.card.legendary ? 'Si' : 'No';
            }
        }
    }
</script>

<style scoped>
.push-btn {
    width: 100%;
    -webkit-transition: background-color .2s linear;
    -moz-transition: background-color .2s linear;
    -ms-transition: background-color .2s linear;
    -o-transition: background-color .2s linear;
    transition: background-color .2s linear;
}

.cantidad {
    text-align: center;
    /* border: 1px solid red; */
    /* height: 45px; */
    width: 90px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: -5px;
}

.cantidad input {
    border: 1px solid #ddd;
    width: 40px;
    outline: 0;
    text-align: center;
}
</style>