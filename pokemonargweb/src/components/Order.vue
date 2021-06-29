<template>
<v-expansion-panels class="order">
    <v-expansion-panel>
        <v-expansion-panel-header>
            <span class="bolder">
                {{ title_order }}
            </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <div class="d-flex justify-space-between align-center">
                <span>
                    {{data_person.social}}: 
                    {{data_person.social === 'instagram' ? '@' : ''}}{{data_person.user}}
                </span>
                <span>Teléfono: {{ data_person.tel }}</span>
            </div>
            <template v-for="(card, key) in shopping_cart">
                <div :key="key" class="data-card d-flex justify-space-between align-center my-4">
                    <img :src="card.img" :alt="card.name">
                    <div>
                        <p>{{card.name}}</p>
                        <p>{{card.amount}}</p>
                        <p>{{card.language}}</p>
                    </div>
                    <p>{{card.amount}} x ${{card.price}}</p>
                </div>
            </template>

            <p class="d-flex justify-space-between align-center ma-0 bolder subtotal">
                <span>Subtotal:</span>
                <span>${{subtotal}}</span>
            </p>
            <p class="d-flex justify-space-between align-center ma-0 bolder total">
                <span>Total:</span>
                <span>${{total}}</span>
            </p>
            <div class="icons-options d-flex justify-space-between align-center mt-3">
                <v-btn dense text small color="green" @click="confirmar">
                    <v-icon dense>mdi-check</v-icon>
                    Confirmar
                </v-btn>
                <v-btn dense text small color="red" @click="rechazar">
                    <v-icon dense>mdi-delete</v-icon>
                    Rechazar
                </v-btn>
            </div>
        </v-expansion-panel-content>
    </v-expansion-panel>
</v-expansion-panels>
</template>

<script>
export default {
    name: 'order',
    props: ['order'],

    methods: {
        confirmar() {
            console.log('confirmar');
        },

        rechazar() {
            console.log('rechazar');
        },

    },

    computed: {
        data_person() {
            if(this.order) { 
                if(this.order.data_person) {
                    return this.order.data_person;
                }
            }
            return {}
        },
        
        shopping_cart() {
            if(this.order) { 
                if(this.order.shopping_cart) {
                    return this.order.shopping_cart;
                }
            }
            return []
        },

        title_order() {
            return this.data_person ? `${this.data_person.first_name} ${this.data_person.last_name}` : '';
        },

        subtotal() {
            let res = 0;
            this.shopping_cart.forEach(card => {
                let subtotal_card = card.price * card.amount;
                res += subtotal_card;
            });

            return res;
        },
        
        total() {
            let res = 0;
            this.shopping_cart.forEach(card => {
                let total_card = card.price * card.amount;
                res += total_card;
            });

            return res;
        }
    }
}
</script>

<style scoped>
.order {
    font-size: 14px;
}

.tel {
    font-size: 12px;
    color: #aaa;
    margin-left: 10px;
}

.data-card img {
    max-width: 75px;
}

.data-card p {
    margin: 0;
    text-align: center;
}

.total {
    font-size: 16px;
}
</style>