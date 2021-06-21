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
                        v-for="(item,i) in card.imgs"
                        :key="i"
                        :src="item"
                        @load="emit_loaded"
                    ></v-carousel-item>
                </v-carousel>
            </div>
        </template>

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

                <span class="stock">/ {{card.stock}}</span>

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

        <div class="d-flex justify-space-between align-center mt-1">
            <span class="d-flex justify-center align-center tipo">
                Tipo: 
                <v-img
                    :alt="card.type" 
                    :title="card.type"
                    class="shrink ml-2"
                    contain
                    :src="`/img/types/${types[card.type]}.webp`"
                    transition="scale-transition"
                    width="20"
                />
            </span>

            <template v-if="logued">
                <delete-item @delete_card="delete_card" />
            </template>
        </div>
    </v-card-text>

    <v-card-actions class="d-flex justify-center align-center">
        <v-tooltip top v-model="state_tooltip_button">
            <template v-slot:activator="{ attrs }">
                <v-btn
                    :color="btn_active ? 'success' : $store.getters.color_app"
                    depressed
                    v-bind="attrs"
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
            </template>
            <span>No puedes superar del máximo disponible</span>
        </v-tooltip>
    </v-card-actions>
</v-card>
</template>

<script>
import db from '../main'
import Delete_item from './Delete_item.vue'
    export default {
        name: 'Card',
        props: ['card', 'is_deck'],

        components: {
            'delete-item': Delete_item,
        },

        data: () => ({
            snackbar_text: '',
            view_carousel: false,
            img_loaded: 0,
            btn_active: false,
            count: 1,
            state_tooltip_input: false,
            state_tooltip_button: false,
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
                let data = {
                    id: this.card.id,
                    data_db: this.is_deck ? 'decks' : 'cards',
                };
                let res = await this.$store.dispatch('delete', data);
                this.$emit('card_delete', res);
            },

            push_shop() {
                if(!this.btn_active) {
                    if(this.card_pushed) {
                        if(this.card_pushed.stock < (this.card_pushed.amount + this.count)) {
                            this.show_tooltip_button();
                            return false;
                        }
                    }
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
                        this.count = 1;
                    }, 1000);
                }
            },

            validate_max_count() {
                if(this.count > this.card.stock) {
                    this.count = this.card.stock;
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
            
            show_tooltip_button() {
                this.state_tooltip_button = true;
                setTimeout(() => {
                    this.state_tooltip_button = false;
                }, 2500);
            },

            edit_count(action) {
                if(action === 'plus') {
                    if(this.count < this.card.stock) {
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
                return this.view_carousel ? this.card.imgs : [];
            },

            logued() {
                return this.$store.getters.logued;
            },
            
            card_pushed() {
                return this.$store.getters.shopping_cart_id(this.card.id);
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
    /* width: 90px; */
    width: 110px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: -5px;
    position: relative;
}

.cantidad input {
    border: 1px solid #ddd;
    /* width: 40px; */
    width: 60px;
    outline: 0;
    text-align: center;
    /* position: relative; */
    padding-right: 15px;
}

.cantidad .stock {
    font-size: 12px;
    position: absolute;
    /* right: 45px; */
    left: 53%;
}

.tipo {
    height: 36px;
}
</style>