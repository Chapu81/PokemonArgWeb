<template>
<v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    class="pb-5"
    transition="dialog-bottom-transition"
>
    <template v-slot:activator="{ on, attrs }">
        <v-btn
            elevation="4"
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
    </template>

    <v-card>
        <v-toolbar
            dark
            :color="$store.getters.color_app"
        >
            <v-spacer></v-spacer>
            <v-btn
                icon
                dark
                @click="dialog = false"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>
        <p class="ma-5 text-center">Recordá que por el momento todas las compras que realices por la página seran únicamente una reserva de la misma. Una vez finalizada la reserva nos podremos en contacto contigo para coordinar la entrega y el medio de pago</p>
        <v-divider></v-divider>
        <div class="vaciar">
            <v-btn
                text
                class="mt-4"
                @click="empty_cart"
            >
                Vaciar carrito
            </v-btn>
        </div>
        
        <ul class="pa-4 pt-0">
            <template v-for="(card, key) in shopping_cart">
                <card-cart :key="key" :card="card" />
            </template>
        </ul>


        
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
    }
}
</script>

<style scoped>
.vaciar {
    text-align: right;
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