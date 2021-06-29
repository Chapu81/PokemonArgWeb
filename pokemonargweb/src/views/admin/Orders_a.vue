<template>
<div class="orders">
    <div class="d-flex justify-space-between align-center" v-if="loaded">
        <h2>Pedidos</h2>
        <v-btn text @click="get_orders">
            Actualizar
        </v-btn>
    </div>

    <template v-for="order in orders">
        <div :key="order.id" class="mt-4" v-show="loaded">
            <order-item :order="order" @update_orders="update_orders($event)"/>
        </div>
    </template>

    <v-progress-circular
		:size="70"
		:width="7"
		:color="$store.getters.color_app" 
		indeterminate
		class="spinner"
		v-if="!loaded"
    ></v-progress-circular>

    <v-snackbar
        v-model="snackbar"
        :timeout="2000"
    >
        {{ text_snackbar }}

        <template v-slot:action="{ attrs }">
            <v-btn
                color="pink"
                text
                v-bind="attrs"
                @click="state_snackbar(false)"
            >
                Cerrar
            </v-btn>
        </template>
    </v-snackbar>
</div>
</template>

<script>
import order from '../../components/Order.vue'
export default {
    name: 'pedidos',

    components: {
        'order-item': order,
    },

    data: () => ({
        orders: [],
        loaded: false,
        text_snackbar: '',
        snackbar: false,
    }),

    created() {
        if(this.$store.getters.orders.length) {
            this.orders = [...this.$store.getters.orders];
            this.loaded = true;
        }else {
            this.get_orders();
        }
    },

    methods:{
        async get_orders() {
			try {
                this.orders = await this.$store.dispatch('save_get_orders');
                this.loaded = true;
			}catch (error) {
				console.log(error);
			}
		},

        update_orders(action) {
            this.get_orders();
            let text = action === 'confirm' 
                    ? 'Confirmacion completada' 
                    : 'Rechazo completado';
            
            this.set_text_snackbar(text);
            this.state_snackbar(true);
        },

        set_text_snackbar(text) {
            this.text_snackbar = text;
        },

        state_snackbar(state) {
            this.snackbar = state;
        }
    }
}
</script>

<style scoped>
.orders {
    width: 100%;
    padding: 15px;
}

@media screen and (min-width: 768px) {
    .orders {
        width: 700px;
        margin: 0 auto;
    }
}
</style>