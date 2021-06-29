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
            <order-item :order="order" />
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