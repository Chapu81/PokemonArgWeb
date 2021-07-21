<template>
<li class="d-flex justify-space-between align-center mt-4 pa-2 rounded">
    <img :src="card.imgs[0]" :alt="card.name" width="80" class="rounded">
    <div>
        <p class="ma-0 text-center">{{card.name}}</p>
        <p class="ma-0 text-center">${{card.price}}</p>
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
    <v-btn
        icon
        @click="delete_cart"
    >
        <v-icon>mdi-delete</v-icon>
    </v-btn>
</li>
</template>

<script>
    export default {
        name: 'CardCart',
        props: ['card'],

        data: () => ({
            count: 1,
            state_tooltip_input: false,
        }),

        watch: {
            amount_cart() {
                this.count = this.amount_cart;
            }
        },

        created() {
            this.count = this.amount_cart;
        },

        methods: {
            delete_cart() {
                this.$store.commit('delete_card_shopping_cart', this.card.id);
            },

            edit_count(action) {
                let upd = true;
                if(action === 'plus') {
                    if(this.count < this.card.stock) {
                        this.count++;
                    }else {
                        this.show_tooltip_input();
                        upd = false;
                    }
                }else {
                    if(this.count > 1) {
                        this.count--;
                    }
                }

                if(upd) {
                    this.$store.commit('set_shopping_cart', {id: this.card.id, amount: this.count});
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
        },

        computed: {
            amount_cart() {
                return this.card.amount ? this.card.amount : 1;
            }
        }
    }
</script>

<style scoped>
li {
    border: 1px solid #ccc;
}

.cantidad {
    text-align: center;
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

@media screen and (min-width: 650px) {
    li {
        width: 45%;
    }
}
</style>