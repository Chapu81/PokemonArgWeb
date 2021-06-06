<template>
    <v-btn
        elevation="4"
        color="error"
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

<script>
export default {
    name: 'cart',

    data: () => ({

    }),

    computed: {
		count_shopping_cart() {
            return this.$store.getters.count_shopping_cart;
        },
    }
}
</script>

<style scoped>

</style>