<template>
<v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    class="pb-5"
    transition="dialog-bottom-transition"
>
    <template v-slot:activator="{ on, attrs }">
        <v-fab-transition>
        <v-btn
            elevation="4"
            v-show="count_shopping_cart"
            :color="$store.getters.color_app"
            v-bind="attrs"
            v-on="on"
            fab
            fixed
            bottom
            right
        >
            <v-badge
                :content="count_shopping_cart"
                :value="count_shopping_cart"
                color="blue"
                overlap
            >
                <v-icon>mdi-cart</v-icon>
            </v-badge>
        </v-btn>
        </v-fab-transition>
    </template>

    <v-card>
        <v-toolbar
            dark
            :color="$store.getters.color_app"
        >
            <v-btn
                text
                small
                class="pa-0"
                v-if="view === 1"
                @click="empty_cart"
            >
                Vaciar carrito
            </v-btn>

            
            <v-btn
                icon
                dark
                v-else 
                @click="set_view(view - 1)"
            >
                <v-icon>mdi-arrow-left</v-icon>
            </v-btn>

            <v-spacer></v-spacer>
            <v-btn
                icon
                dark
                @click="dialog = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <p class="my-5 mx-auto text-center text-cart">Por el momento todas las compras que realices por la página seran únicamente una reserva de la misma. Una vez finalizada la reserva nos podremos en contacto contigo para coordinar la entrega y el medio de pago.</p>
        
        <v-divider></v-divider>

        <div v-if="view === 1" class="views">
            <ul class="pa-5 pt-0 flex">
                <template v-for="(card, key) in shopping_cart">
                    <card-cart :key="key" :card="card" />
                </template>
            </ul>

            <p class="total pa-5 pt-0 d-flex justify-space-between align-center">
                <span>
                    Total:
                </span>
                <span>
                    ${{total | currency_format}}
                </span>
            </p>

            <div class="px-5">
                <v-btn
                    :color="color_app"
                    elevation="2"
                    block
                    @click="set_view(2)"
                >
                    Continuar
                </v-btn>
            </div>
        </div>

        <div v-if="view === 2" class="views inputs pa-5">
            <v-text-field
                label="Nombre"
                v-model="data_person.first_name"
                outlined
                dense
            ></v-text-field>
            <v-text-field
                label="Apellido"
                v-model="data_person.last_name"
                outlined
                dense
            ></v-text-field>
            <v-text-field
                label="Teléfono"
                v-model="data_person.tel"
                type="number"
                outlined
                dense
            ></v-text-field>

            <v-radio-group
                class="radios"
                dense
                v-model="data_person.social"
                row
            >
                <v-radio
                    label="Instagram"
                    value="instagram"
                ></v-radio>
                <v-radio
                    label="Facebook"
                    value="facebook"
                ></v-radio>
            </v-radio-group>

            <v-text-field
                v-show="data_person.social !== ''"
                :label="`Usuario ${data_person.social} ${data_person.social === 'instagram' ? '(sin @)' : ''}`"
                v-model="data_person.user"
                outlined
                dense
            ></v-text-field>

            <div>
                <v-btn
                    :color="color_app"
                    elevation="2"
                    block
                    @click="continue_form"
                    :disabled="!valid_form"
                >
                    Continuar
                </v-btn>
            </div>
        </div>

        <div v-if="view === 3" class="views last-view">
            <div class="flex pa-5">
                <div>
                    <p class="mb-1">Datos personales</p>
                    <ul class="pl-0">
                        <li>
                            {{data_person.first_name}} {{data_person.last_name}}
                        </li>
                        <li>
                            {{data_person.tel}}
                        </li>
                        <li>
                            {{data_person.social}}
                        </li>
                        <li>
                            {{data_person.user}}
                        </li>
                    </ul>
                </div>

                <v-divider class="my-4 divider-mobile"></v-divider>

                <div>
                    <p class="mb-1">Cartas</p>
                    <ul class="pl-0 totals">
                        <template v-for="(card, key) in shopping_cart">
                            <li :key="key">
                                <span>
                                    {{card.name}} x {{card.amount}}:
                                </span>
                                <span>
                                    ${{card.price * card.amount | currency_format}}
                                </span>
                                <!-- {{card.name}} x {{card.amount}} = ${{card.price * card.amount | currency_format}} -->
                            </li>
                        </template>

                        
                        <li class="bolder" v-if="is_discounts">
                            <span>Subtotal:</span>
                            <span>${{ total | currency_format }}</span>
                            <!-- Subtotal: ${{ total | currency_format }} -->
                        </li>
                        <li class="bolder" v-if="is_discounts">
                            <span>Descuento (10%):</span>
                            <span>${{ discount | currency_format }}</span>
                            <!-- Descuento: ${{ discount | currency_format }} (10%) -->
                        </li>
                        <li class="bolder">
                            <span>Total:</span>
                            <span>${{ final_total | currency_format }}</span>
                            <!-- Total: ${{ final_total | currency_format }} -->
                        </li>
                    </ul>
                </div>

                <!-- <v-divider class="my-4 divider-mobile"></v-divider> -->

                <!-- <div>
                    <p class="mb-1">Datos personales</p>
                    <ul class="pl-0">
                        <li>
                            {{data_person.first_name}} {{data_person.last_name}}
                        </li>
                        <li>
                            {{data_person.tel}}
                        </li>
                        <li>
                            {{data_person.social}}
                        </li>
                        <li>
                            {{data_person.user}}
                        </li>
                    </ul>
                </div> -->
            </div>
            
            <div class="px-5">
                <v-btn
                    :color="color_app"
                    elevation="2"
                    block
                    :loading="load_confirm"
                    @click="confirm"
                >
                    Confirmar reserva
                </v-btn>
            </div>
        </div>

    </v-card>
    
    <snackbar-c :text="text_snackbar" />

    <loader-c v-if="!loaded" />

</v-dialog>
</template>

<script>
import card_cart from './Card_cart.vue'
export default {
    name: 'Cart',

    components: {
        'card-cart': card_cart,
    },

    watch: {
        count_shopping_cart() {
            if(this.count_shopping_cart === 0) {
                this.dialog = false;
            }
        },

        dialog() {
            if(!this.dialog) {
                this.view = 1;
            }
        },

        view() {
            if(this.view === 3) {
                this.loaded = false;
                this.get_discounts();
            }
        }
    },

    data: () => ({
        dialog: false,
        notifications: false,
        widgets: false,
        view: 1,

        text_snackbar: '',
        snackbar: false,

        load_confirm: false,

        loaded: true,

        data_person: {
            first_name: '',
            last_name: '',
            tel: '',
            social: '',
            user: '',
        }
    }),

    methods: {
        empty_cart() {
            this.$store.commit('empty_count_shopping_cart');
            this.dialog = false;
        },

        set_view(num) {
            this.view = num;
        },

        continue_form() {
            if(this.valid_form) {
                this.set_view(3);
            }
        },

        async confirm() {
            this.load_confirm = true;
            // const date = new Date();
            const data_order = {
                data_person: {
                    ...this.data_person,
                    discount: this.is_discounts,
                },
                shopping_cart: this.set_data_shopping_order,
                // date: Date.parse(date)
            }

            let res = await this.$store.dispatch('push_order', data_order);

            if(res) {
                this.text_snackbar = 'El pedido se realizó correctamente';
                setTimeout(() => {
                    // this.empty_cart();
                    // this.text_snackbar = '';
                    window.location.reload();
                }, 1000)
            }else{
                this.text_snackbar = 'Ocurrió un error al confirmar el pedido';
                this.load_confirm = false;
            }

            this.snackbar = true;
        },

        async get_discounts() {
			try {
                await this.$store.dispatch('save_get_discounts');
                this.loaded = true;
			}catch (error) {
				console.log(error);
			}
		},
    },

    computed: {
        count_shopping_cart() {
            return this.$store.getters.count_shopping_cart;
        },
        
        shopping_cart() {
            return this.$store.getters.shopping_cart;
        },
        
        color_app() {
            return this.$store.getters.color_app;
        },

        total() {
            let total = 0;
            this.shopping_cart.forEach(card => {
                total += (parseInt(card.amount) * parseInt(card.price));
            });

            return total;
        },

        valid_form() {
            if(this.data_person.first_name && this.data_person.first_name && this.data_person.tel && this.data_person.user) {
                return true;
            }

            return false;
        },

        set_data_shopping_order() {
            let res = [];
            this.shopping_cart.forEach(card => {
                let new_data = {...card};
                res.push(new_data);
            });

            return res;
        },

        discounts() {
            return this.$store.getters.discounts;
        },

        is_discounts() {
            if(this.data_person.social === 'instagram' && this.data_person.user !== '') {
                let repeat = this.discounts.filter(discount => discount.user.toLowerCase() === this.data_person.user.toLowerCase());
                if(repeat.length !== 0) {
                    return true;
                }
            }

            return false;
        },

        discount() {
            if(this.is_discounts) {
                return this.total / 10;
            }

            return 0;
        },

        final_total() {
            if(this.is_discounts) {
                return this.total - this.discount;
            }

            return this.total;
        }
    }
}
</script>

<style scoped>
.text-cart {
    font-size: 14px;
}

.total {
    font-weight: bold;
    font-size: 20px;
}

.views {
    max-width: 1000px;
    margin: 0 auto;
}

.views.inputs {
    max-width: 600px;
    margin: 0 auto;
}

.radios {
    margin-top: -10px;
}

li {
    list-style-type: none;
}

.flex p {
    font-weight: bold;
    font-size: 18px;
}

ul.totals li {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@media screen and (min-width: 650px) {
    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        max-width: 1000px;
        margin: 0 auto;
    }
    
    div.flex {
        justify-content: space-around;
        align-items: flex-start;
    }

    .divider-mobile {
        display: none;
    }

    .last-view > div div{
        width: 45%;
    }
}

@media screen and (min-width: 768px) {
    .text-cart {
        font-size: 16px;
        max-width: 778px;
        margin: 0 auto;
    }
}

@media screen and (min-width: 992px) {
    .text-cart {
        font-size: 18px;
        max-width: 875px;
    }
}

@media screen and (min-width: 1200px) {
    .text-cart {
        font-size: 19px;
        max-width: 925px;
    }
}
</style>