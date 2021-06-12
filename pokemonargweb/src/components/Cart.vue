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
                @click="empty_cart"
            >
                Vaciar carrito
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
        <p class="ma-5 text-center text-cart">Por el momento todas las compras que realices por la página seran únicamente una reserva de la misma. Una vez finalizada la reserva nos podremos en contacto contigo para coordinar la entrega y el medio de pago.</p>
        <v-divider></v-divider>
        <ul class="pa-5 pt-0">
            <template v-for="(card, key) in shopping_cart">
                <card-cart :key="key" :card="card" />
            </template>
        </ul>

        <p class="total pa-5 pt-0 ma-0 d-flex justify-space-between align-center">
            <span>
                Total:
            </span>
            <span>
                ${{total}}
            </span>
        </p>

        <v-btn
            block
            :color="color_app"
            elevation="2"
        >
            Continuar
        </v-btn>
    </v-card>

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
        }
    },

    data: () => ({
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
    }),

    methods: {
        empty_cart() {
            this.$store.commit('empty_count_shopping_cart');
            this.dialog = false;
        }
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
        }
    }
}
</script>

<style scoped>
.text-cart {
    font-size: 13px;
}

.total {
    font-weight: bold;
    font-size: 20px;
}

@media screen and (min-width: 650px) {
    ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        max-width: 1000px;
        margin: 0 auto;
    }
}
</style>