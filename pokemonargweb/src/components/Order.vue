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
                    <img :src="card.imgs[0]" :alt="card.name">
                    <div>
                        <p>{{card.name}}</p>
                        <p>Cant: {{card.amount}}</p>
                        <p>{{card.language}}</p>
                    </div>
                    <p>{{card.amount}} x ${{card.price | currency_format}}</p>
                </div>
            </template>

            <template v-for="(item, key) in totals">
                <p class=" d-flex 
                        justify-space-between 
                        align-center 
                        ma-0 bolder" 
                    :class="item.data_class"
                    v-if="item.view"
                    :key="key + item.text">
                    <span>{{ item.text }}:</span>
                    <span>${{item.value | currency_format}}</span>
                </p>
            </template>

            <div class="icons-options d-flex justify-space-between align-center mt-3">
                <v-btn dense 
                    text small 
                    color="green" 
                    @click="confirm" 
                    :disabled="loading_reject"
                    :loading="loading_confirm">
                        <v-icon dense>mdi-check</v-icon>
                        Confirmar
                </v-btn>
                <v-btn dense 
                    text small 
                    color="red" 
                    @click="reject" 
                    :disabled="loading_confirm"
                    :loading="loading_reject">
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

    data: () => ({
        loading_confirm: false,
        loading_reject: false,
    }),

    methods: {
        async confirm() {
            this.loading_confirm = true;
            console.log('confirmar');
        },

        async reject() {
            this.loading_reject = true;
            let data = {
                id: this.order.id,
                data_card: this.order.shopping_cart,
            }
            let res = await this.$store.dispatch('reject_order', data);

            if(res) {
                this.update_orders('reject');
            }
        },

        update_orders(action) {
            this.$emit('update_orders', action);
        }

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
        
        discount() {
            if(this.data_person.discount) {
                return this.subtotal / 10;
            }
            
            return 0;
        },
        
        total() {
            return this.subtotal - this.discount;
        },

        totals() {
            return [
                {
                    data_class: 'subtotal',
                    text: 'Subtotal',
                    value: this.subtotal,
                    view: this.data_person.discount,
                },
                {
                    data_class: '',
                    text: 'Descuento',
                    value: this.discount,
                    view: this.data_person.discount,
                },
                {
                    data_class: 'total',
                    text: 'Total',
                    value: this.total,
                    view: true
                },
            ]
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